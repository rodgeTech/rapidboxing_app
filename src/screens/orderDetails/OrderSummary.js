import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-ui-kitten';

import {moneyFormat} from '../../utils/money';

export default (OrderSummary = ({order}) => {
  return (
    <React.Fragment>
      <Text category="h6" style={{marginBottom: 10, marginTop: 25}}>
        Order Summary
      </Text>
      <View style={styles.container}>
        <View style={[styles.row, {paddingTop: 0}]}>
          <View style={{flex: 1}}>
            <Text>Flat Order Total</Text>
          </View>
          <View>
            <Text>{moneyFormat(order.purchaseTotal, 'bzd')}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text>Shipping Total</Text>
          </View>
          <View>
            <Text>{moneyFormat(order.shipping, 'bzd')}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text>Fees Total</Text>
          </View>
          <View>
            <Text>{moneyFormat(order.feesTotal, 'bzd')}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 12}}>
          <View style={{flex: 1}}>
            <Text category="s1">Overall Total</Text>
          </View>
          <View>
            <Text category="s1">{moneyFormat(order.total, 'bzd')}</Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EEF8FF',
    paddingVertical: 12,
  },
});
