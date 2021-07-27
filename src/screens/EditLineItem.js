import React, {useEffect, useContext, useState, useReducer} from 'react';
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
import {getType} from 'mime';

import {useSpinner} from '../hooks/useSpinner';
import Images from './newOrder/Images';

import api from '../utils/api';
import Form from '../components/LineItem/Form';
import {OrderContext} from '../contexts/OrderContext';

const initialState = {
  loading: true,
  lineItem: {},
  image: {},
  shippingRates: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_LINE_ITEM_SUCCESS': {
      const {lineItem, image, shippingRates} = action;
      return {
        ...state,
        lineItem,
        image,
        shippingRates,
        loading: false,
      };
    }
    case 'GET_LINE_ITEM_FAILURE':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const EditLineItem = ({navigation}) => {
  const lineItemId = navigation.getParam('lineItemId', null);

  const [orderState, orderDispatch] = useContext(OrderContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const {show: showSpinner, hide: hideSpinner, RenderSpinner} = useSpinner();

  useEffect(() => {
    const fetchData = async () => {
      const {data: lineItemRes} = await api.get(`/line_items/${lineItemId}`);
      const {data: shippingRatesRes} = await api.get(
        '/settings/shipping_rates',
      );

      const {lineItem, image} = normalize(lineItemRes);

      const imagesData = build(normalize(lineItemRes), 'image', null);

      orderDispatch({
        type: 'SET_IMAGES',
        images: imagesData,
      });

      const shippingRates = normalize(shippingRatesRes);

      dispatch({
        type: 'GET_LINE_ITEM_SUCCESS',
        image,
        lineItem,
        shippingRates,
      });
    };

    fetchData();
  }, []);

  const updateLineItem = (values, resetForm) => {
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
      .put(`/line_items/${lineItemId}`, formData)
      .then(res => {
        hideSpinner();
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('Cart');
      })
      .catch(err => {
        hideSpinner();
        console.log(err);
      });
  };

  if (state.loading)
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;

  const lineItemData = build(state, 'lineItem', null)[0];

  const shippingRates = build(state.shippingRates, 'weightShippingRate', null);

  console.log('LINE', lineItemData);

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
        {orderState.images.length ? (
          <View
            style={{
              backgroundColor: '#F2F6FF',
              paddingTop: 15,
              paddingBottom: 15,
            }}>
            <Images images={orderState.images} />
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
          <Form
            rates={selectRatesData}
            onSubmit={updateLineItem}
            lineItem={lineItemData}
          />
        </Layout>
      </InputScrollView>
    </React.Fragment>
  );
};

EditLineItem.navigationOptions = screenProps => ({
  title: 'Edit Cart Item',
});

export default EditLineItem;

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
