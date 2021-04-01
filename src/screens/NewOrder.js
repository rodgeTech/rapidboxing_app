import React, {useEffect, useContext} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {StackActions} from 'react-navigation';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import {Layout} from 'react-native-ui-kitten';
import InputScrollView from 'react-native-input-scroll-view';

import {ShippingRateContext} from '../contexts/ShippingRateContext';
import {useSpinner} from '../hooks/useSpinner';

import api from '../utils/api';
import Form from './newOrder/Form';

const NewOrder = ({navigation}) => {
  const [shippingRateState, shippingRateDispatch] = useContext(
    ShippingRateContext,
  );

  const {show: showSpinner, hide: hideSpinner, RenderSpinner} = useSpinner();

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
    const {
      link,
      details,
      quantity,
      shippingRate,
      price,
      extraPounds,
      localPickup,
    } = values;
    const params = {
      link,
      details,
      quantity,
      price,
      shipping_rate_id: shippingRate.id,
      extra_pounds: extraPounds,
      local_pickup: localPickup,
    };

    api
      .post('/line_items', params)
      .then(res => {
        resetForm();
        hideSpinner();
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('Cart');
      })
      .catch(err => {
        hideSpinner();
        console.log(err);
      });
  };

  if (shippingRateState.fetchingShippingRates) {
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;
  }

  const shippingRates = build(
    shippingRateState.shippingRates,
    'weightShippingRate',
    null,
  );

  const selectRatesData = shippingRates.map(rate => ({
    id: rate.id,
    text: `${rate.name} (${rate.minOrderWeight}lb - ${
      rate.maxOrderWeight
    }lb) = ${rate.rateAmount}`,
  }));

  return (
    <React.Fragment>
      <RenderSpinner />
      <Layout style={styles.container}>
        <InputScrollView showsVerticalScrollIndicator={false}>
          <Form rates={selectRatesData} createLineItem={createLineItem} />
        </InputScrollView>
      </Layout>
    </React.Fragment>
  );
};

NewOrder.navigationOptions = screenProps => ({
  title: 'Add To Cart',
});

export default NewOrder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  select: {
    width: '100%',
  },
});
