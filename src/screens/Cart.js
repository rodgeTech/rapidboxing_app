import React, {useLayoutEffect, useContext} from 'react';
import {StyleSheet, View, ActivityIndicator, ScrollView} from 'react-native';
import {Layout, Button} from 'react-native-ui-kitten';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

import {CartContext} from '../contexts/CartContext';
import api from '../utils/api';
import CartItems from './cart/CartItems';
import OrderSummary from './cart/OrderSummary';
import CartEmpty from './cart/CartEmpty';

const Cart = ({navigation}) => {
  const [state, dispatch] = useContext(CartContext);

  useLayoutEffect(() => {
    async function fetchCart() {
      await api.setAuthToken('tokenData');
      api
        .get('/cart')
        .then(({data}) => {
          const {cart, lineItem} = normalize(data);

          dispatch({
            type: 'GET_CART_SUCCESS',
            cart,
            lineItems: lineItem,
          });
        })
        .catch(err => {
          dispatch({type: 'GET_CART_FAILURE'});
        });
    }
    fetchCart();

    const navFocusListener = navigation.addListener('didFocus', () => {
      fetchCart();
    });

    return () => {
      navFocusListener.remove();
    };
  }, []);

  const removeLineItem = lineItemId => {
    api
      .del(`/line_items/${lineItemId}`)
      .then(({data}) => {
        const {cart} = normalize(data);

        dispatch({type: 'DELETE_CART_ITEM_SUCCESS', lineItemId, cart});
      })
      .catch(err => {
        dispatch({type: 'DELETE_CART_ITEM_FAILURE'});
      });
  };

  if (state.fetchingCart) {
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;
  }

  const cart = build(state, 'cart', null);
  const lineItems = build(state, 'lineItems', null);

  if (!lineItems || lineItems.length == 0) {
    return <CartEmpty navigate={navigation.navigate} />;
  }

  return (
    <Layout style={styles.container} level="2">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CartItems
          items={lineItems}
          removeLineItem={removeLineItem}
          navigate={navigation.navigate}
        />
        <OrderSummary cart={cart[0]} />
        <View style={{marginHorizontal: 6}}>
          <Button
            status="primary"
            size="large"
            style={{width: '100%', marginTop: 30, marginBottom: 20}}
            onPress={() => navigation.navigate('Checkout')}>
            Checkout
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
