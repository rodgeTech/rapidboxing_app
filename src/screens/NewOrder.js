import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackActions} from 'react-navigation';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import {Layout, Icon} from 'react-native-ui-kitten';
import InputScrollView from 'react-native-input-scroll-view';

import {ShippingRateContext} from '../contexts/ShippingRateContext';
import {useSpinner} from '../hooks/useSpinner';
import Images from './newOrder/Images';

import api from '../utils/api';
import Form from './newOrder/Form';
import {OrderContext} from '../contexts/OrderContext';

const NewOrder = ({navigation}) => {
  const [orderState, orderDispatch] = useContext(OrderContext);

  const orderImages = orderState.images;

  console.log('NEW ORDER STATE ', orderImages);

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
      <InputScrollView showsVerticalScrollIndicator={false}>
        {orderImages.length ? (
          <View
            style={{
              backgroundColor: '#F2F6FF',
              paddingTop: 15,
              paddingBottom: 15,
            }}>
            <Images images={orderImages} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('CameraRollSelect')}
            style={{
              height: 200,
              backgroundColor: '#f7f7f7',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="image-outline" fill="#C5CEE0" width={55} height={55} />
          </TouchableOpacity>
        )}

        <Layout style={styles.container}>
          <Form rates={selectRatesData} createLineItem={createLineItem} />
        </Layout>
      </InputScrollView>
    </React.Fragment>
  );
};

NewOrder.navigationOptions = screenProps => ({
  title: 'New Order',
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
  imagePreivew: {
    resizeMode: 'cover',

    height: 300,
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
