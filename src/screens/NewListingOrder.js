import React, {useEffect, useContext} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {StackActions} from 'react-navigation';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import {Layout} from 'react-native-ui-kitten';
import InputScrollView from 'react-native-input-scroll-view';

import {ListingContext} from '../contexts/ListingContext';
import {ShippingRateContext} from '../contexts/ShippingRateContext';
import {useSpinner} from '../hooks/useSpinner';

import api from '../utils/api';
import Form from './newListingOrder/Form';
import ListingPreview from './newListingOrder/ListingPreview';

const NewListingOrder = ({navigation}) => {
  const [listingState, listingDispatch] = useContext(ListingContext);
  const [shippingRateState, shippingRateDispatch] = useContext(
    ShippingRateContext,
  );

  const {show: showSpinner, hide: hideSpinner, RenderSpinner} = useSpinner();

  const listingId = navigation.getParam('listingId', null);

  useEffect(() => {
    listingDispatch({type: 'GET_LISTING'});
    api
      .get(`/listings/${listingId}`)
      .then(({data}) => {
        const listing = normalize(data);

        listingDispatch({type: 'GET_LISTING_SUCCESS', listing});
      })
      .catch(() => {
        listingDispatch('GET_LISTING_FAILURE');
      });
  }, [listingId]);

  useEffect(() => {
    api
      .get('/settings/shipping_rates')
      .then(({data}) => {
        const shippingRates = normalize(data);

        shippingRateDispatch({
          type: 'GET_SHIPPING_RATES_SUCCESS',
          shippingRates,
        });
      })
      .catch(err => {
        shippingRateDispatch({type: 'GET_SHIPPING_RATES_FAILURE'});
      });
  }, []);

  const createLineItem = (values, resetForm) => {
    showSpinner();

    const {link, details, quantity, shippingRate, price} = values;
    const params = {
      link,
      details,
      quantity,
      price,
      shipping_rate_id: shippingRate.id,
      listing_id: listingState.listing.id,
    };

    api
      .post('/line_items', params)
      .then(res => {
        // resetForm();
        hideSpinner();
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('Cart');
      })
      .catch(err => {
        hideSpinner();
        console.log(err);
      });
  };

  if (shippingRateState.fetchingShippingRates || listingState.fetchingListing) {
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;
  }

  const shippingRates = build(
    shippingRateState.shippingRates,
    'weightShippingRate',
    null,
  );
  const listing = build(listingState.listing, 'listing', null);

  const selectRatesData = shippingRates.map(rate => ({
    id: rate.id,
    text: `${rate.name} (${rate.minOrderWeight}lb - ${
      rate.maxOrderWeight
    }lb) = ${rate.rateAmount}`,
  }));

  console.log(selectRatesData);

  return (
    <React.Fragment>
      <RenderSpinner />
      <InputScrollView showsVerticalScrollIndicator={false}>
        <ListingPreview listing={listing[0]} />
        <Layout style={styles.container}>
          <Form
            rates={selectRatesData}
            createLineItem={createLineItem}
            listing={listing[0]}
          />
        </Layout>
      </InputScrollView>
    </React.Fragment>
  );
};

NewListingOrder.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
});

export default NewListingOrder;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    paddingVertical: 30,
  },
  select: {
    width: '100%',
  },
});
