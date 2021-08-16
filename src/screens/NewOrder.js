import React, {useEffect, useContext} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {StackActions} from 'react-navigation';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import {Layout, Icon} from 'react-native-ui-kitten';
import InputScrollView from 'react-native-input-scroll-view';
import {getType} from 'mime';

import {ShippingRateContext} from '../contexts/ShippingRateContext';
import {useSpinner} from '../hooks/useSpinner';

import api from '../utils/api';
import Form from './newOrder/Form';
import {OrderContext} from '../contexts/OrderContext';
import ParallaxCarousel from '../components/ParallaxCarousel';

const NewOrder = ({navigation}) => {
  const [orderState, orderDispatch] = useContext(OrderContext);

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

    const formData = new FormData();
    formData.append('link', link);
    formData.append('details', details);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('shipping_rate_id', shippingRate.id);
    formData.append('extra_pounds', extraPounds);
    formData.append('local_pickup', localPickup);

    for (const orderImage of orderState.images) {
      const image = {
        uri: `${orderImage.uri}`,
        name: orderImage.filename,
        type: getType(orderImage.filename),
      };

      formData.append('images[]', image);
    }

    api
      .post('/line_items', formData)
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
      <InputScrollView showsVerticalScrollIndicator={true}>
        {orderState.images && (
          <View
            style={{
              backgroundColor: '#F2F6FF',
              paddingTop: 15,
              paddingBottom: 15,
            }}>
            <ParallaxCarousel
              images={orderState.images}
              onRemoveImage={image => {
                orderDispatch({
                  type: 'REMOVE_IMAGE',
                  image,
                });
              }}
            />
          </View>
        )}

        <Layout style={styles.container}>
          <Form rates={selectRatesData} createLineItem={createLineItem} />
        </Layout>
      </InputScrollView>
    </React.Fragment>
  );
};

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
  imagePreivew: {
    resizeMode: 'cover',

    height: 300,
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
