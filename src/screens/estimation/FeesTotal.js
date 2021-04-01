import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-ui-kitten';

import {moneyFormat} from '../../utils/money';

const FeesTotal = ({values}) => {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text category='h6' style={{marginBottom: 10}}>
          Fees Total
        </Text>
        <View style={{marginTop: 14, flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text>GST</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.tax_total, "bzd")}</Text>
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
            <Text>Duty Rate</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.duty_total, 'bzd')}</Text>
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
            <Text>Service Charge</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.service_charge_total, 'bzd')}</Text>
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
            <Text>Insurance</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.insurance_total, "bzd")}</Text>
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
            <Text>Local Pickup</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.local_pickup_total, "bzd")}</Text>
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
            <Text>Fees Total</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>{moneyFormat(values.fees_total, "bzd")}</Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

export default FeesTotal;

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
