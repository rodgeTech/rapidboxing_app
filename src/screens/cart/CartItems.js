import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Text
} from 'react-native-ui-kitten';

import CartItem from './cartItems/CartItem';


export default CartItems = ({ items, removeLineItem, navigate }) => {
  return (
    <React.Fragment>
      <Text category='h6' style={{ paddingHorizontal: 6, paddingTop: 16, marginBottom: 10, color: '#313131'}}>
        Items in Cart ({items.length})
      </Text>
      {items.map(item => (
        <CartItem
          item={item}
          key={item.id}
          removeLineItem={removeLineItem}
          navigate={navigate}
        />
      ))}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  list: {
    height: 150,
    backgroundColor: 'transparent'
  },
});
