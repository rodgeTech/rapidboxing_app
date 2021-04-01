import React, {useEffect, useReducer} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator, View} from 'react-native';
import {Layout, Text} from 'react-native-ui-kitten';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

import api from '../utils/api';
import OrderSummary from './orderDetails/OrderSummary';

import {moneyFormat} from '../utils/money';

const initialState = {
  fetchingOrder: true,
  order: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ORDER_SUCCESS': {
      const {order} = action;
      return {
        ...state,
        order,
        fetchingOrder: false,
      };
    }
    case 'GET_ORDER_FAILURE':
      return {
        ...state,
        fetchingOrder: false,
      };
    default:
      return state;
  }
};

export default (OrderDetails = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const orderId = navigation.getParam('orderId', null);

  useEffect(() => {
    api
      .get(`/orders/${orderId}`)
      .then(({data}) => {
        const order = normalize(data);

        dispatch({type: 'GET_ORDER_SUCCESS', order});
      })
      .catch(() => {
        dispatch({type: 'GET_ORDER_FAILURE'});
      });
  }, []);

  if (state.fetchingOrder)
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;

  const orderData = build(state.order, 'order', null);

  const order = orderData[0];

  return (
    <Layout style={styles.container} level="2">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 30,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#ebebeb',
          }}>
          <Text category="h5" style={{color: '#2980b9'}}>
            Balance: {moneyFormat(order.balance, 'bzd')}
          </Text>
        </View>
        <OrderSummary order={order} />
      </ScrollView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
