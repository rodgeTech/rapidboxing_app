import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-ui-kitten';

import {moneyFormat} from '../../utils/money';

export default (OrderSummary = ({cart}) => (
  <React.Fragment>
    <Text
      category="h6"
      style={{
        paddingHorizontal: 6,
        marginBottom: 16,
        marginTop: 14,
        color: '#313131',
      }}>
      Order Summary
    </Text>
    <View
      style={{
        backgroundColor: '#fff',
        padding: 20,
        marginHorizontal: 6,
        borderRadius: 8,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text category='h6'>Estimated Total:</Text>
        </View>
        <View>
          <Text category="h6" style={{color: '#28a745'}}>
            {moneyFormat(cart.estimatedTotal, 'bzd')}
          </Text>
        </View>
      </View>
    </View>
  </React.Fragment>
));

const styles = StyleSheet.create({
  list: {
    height: 150,
    backgroundColor: 'transparent',
  },
});
