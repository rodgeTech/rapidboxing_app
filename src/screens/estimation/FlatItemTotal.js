import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-ui-kitten';

import {moneyFormat} from '../../utils/money';

const FlatItemTotal = ({values}) => {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text category='h6' style={{marginBottom: 10}}>
          Flat Line Item Total
        </Text>
        <View style={{marginTop: 14, flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text>Quantity</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{values.quantity}</Text>
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
            <Text>USD Sub Total</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.usd_total, 'usd')}</Text>
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
            <Text>BZD Sub Total</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text category="s1">{moneyFormat(values.bzd_total, 'bzd')}</Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

export default FlatItemTotal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EEF8FF',
    paddingVertical: 12,
  },
});
