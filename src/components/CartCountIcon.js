import React, {useContext} from 'react';
import {View, Text} from 'react-native';

import {CartContext} from '../contexts/CartContext';

export default function CartCountIcon() {
  const [state, dispatch] = useContext(CartContext);

  const count = state.lineItems ? Object.keys(state.lineItems).length : 0;

  return (
    <View
      style={{
        color: '#FFF',
        position: 'absolute',
        top: -0,
        right: -10,
        margin: -1,
        minWidth: 15,
        height: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        textAlign: 'center',
      }}>
      <Text style={{fontSize: 10}}>{count}</Text>
    </View>
  );
}
