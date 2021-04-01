import React, {useReducer, useEffect} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import {Layout} from 'react-native-ui-kitten';

import api from '../utils/api';
import Orders from './myOrders/Orders';

const initialState = {
  fetchingOrders: true,
  orderIds: [],
  orders: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ORDERS_SUCCESS': {
      const {orderIds, orders} = action;
      return {
        ...state,
        orderIds,
        orders,
        fetchingOrders: false,
      };
    }
    case 'GET_ORDERS_FAILURE':
      return {
        ...state,
        fetchingOrders: false,
      };
    default:
      return state;
  }
};

export default (MyOrders = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    api
      .get('/orders')
      .then(({data}) => {
        const orders = normalize(data, {endpoint: '/orders'});
        const orderIds = orders.meta['/orders'].data.map(({id}) => Number(id));

        dispatch({
          type: 'GET_ORDERS_SUCCESS',
          orders,
          orderIds,
        });
      })
      .catch(err => {
        dispatch({type: 'GET_ORDERS_FAILURE'});
      });
  }, []);

  if (state.fetchingOrders)
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;

  const ordersData = build(state.orders, 'order', null);
  const orders = state.orderIds.map(id => ordersData.find(x => x.id === id));

  return (
    <Layout style={styles.container} level="2">
      <Orders items={orders} navigation={navigation} />
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
