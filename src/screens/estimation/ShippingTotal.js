import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-ui-kitten';

import {moneyFormat} from '../../utils/money';

const ShippingTotal = ({values}) => {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text category='h6' style={{marginBottom: 10}}>
          Shipping Total
        </Text>
        <View style={{marginTop: 14, flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text>Shipping Rate</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{values.shippingRate.name}</Text>
            <Text>{values.shippingRate.minOrderWeight} lb - {values.shippingRate.maxOrderWeight} lb</Text>
            <Text>{values.shippingRate.rateAmount} USD</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            paddingVertical: 12,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: '#EEF8FF',
          }}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text>Flat Shipping</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.flat_shipping_total, 'usd')}</Text>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 12,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: '#EEF8FF',
          }}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text>Add'l Lbs {parseInt(values.extra_pounds) > 0 && `(${values.extra_pounds})`}</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.additional_pounds_total, 'bzd')}</Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: 12,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: '#EEF8FF',
          }}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text>Shipping Total</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.shipping_total, "bzd")}</Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

export default ShippingTotal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EEF8FF',
    paddingVertical: 12,
  },
});
