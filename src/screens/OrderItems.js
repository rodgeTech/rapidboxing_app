import React, { useEffect, useReducer } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View
} from 'react-native';
import {
  Layout,
} from 'react-native-ui-kitten';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

import api from '../utils/api';
import OrderItem from './orderItems/OrderItem';

const initialState = {
  fetchingOrder: true,
  order: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ORDER_SUCCESS': {
      const {
        order,
      } = action;
      return {
        ...state,
        order,
        fetchingOrder: false,
      };
    }
    case 'GET_ORDER_FAILURE':
      return {
        ...state,
        fetchingOrder: false
      };
    default:
      return state;
  }
};

const OrderItems = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const orderId = navigation.getParam('orderId', null)

  useEffect(() => {
    api
      .get(`/orders/${orderId}`)
      .then(({ data }) => {
        const order = normalize(data);

        dispatch({ type: 'GET_ORDER_SUCCESS', order });
      })
      .catch(() => {
        dispatch({ type: 'GET_ORDER_FAILURE' });
      });
  }, []);

  if (state.fetchingOrder) return <ActivityIndicator size="large" style={{ marginTop: 30 }} />

  const orderItems = build(state.order, 'orderItem', null);

  return (
    <Layout style={styles.container} level="2">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 30 }}>
          {orderItems.map(item => (
            <OrderItem item={item} key={item.id} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}

export default OrderItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
});
