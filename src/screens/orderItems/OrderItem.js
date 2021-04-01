import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-ui-kitten';

import {moneyFormat} from '../../utils/money';

export default (OrderItem = ({item, navigation}) => (
  <View style={styles.listItem}>
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginRight: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ListingWebView', {
                url: item.link,
                title: item.link,
              })
            }
            activeOpacity={0.7}>
            <Text numberOfLines={1}>{item.link}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ListingWebView', {
            url: item.link,
            title: item.link,
          })
        }>
        <Icon
          name="external-link-outline"
          width={20}
          height={20}
          fill="#2980b9"
        />
      </TouchableOpacity>
    </View>
    <Text category="s1" style={{marginTop: 25}}>
      Flat Line Item Total
    </Text>
    <View style={{marginTop: 14, flexDirection: 'row'}}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>Quantity</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text>{item.quantity}</Text>
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
        <Text>{moneyFormat(item.price, 'usd')}</Text>
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
        <Text category="s1">{moneyFormat(item.priceUsd, 'bzd')}</Text>
      </View>
    </View>
    <Text category="s1" style={{marginTop: 25}}>
      Shipping Total
    </Text>
    <View style={{marginTop: 14, flexDirection: 'row'}}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>Shipping Rate</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text>{item.shippingRateName}</Text>
        <Text>
          {item.shippingRateMin}lb - {item.shippingRateMax}lb
        </Text>
        <Text>{item.shippingRateAmount} USD</Text>
      </View>
    </View>
    <View
      style={{
        marginTop: 14,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEF8FF',
        paddingTop: 12,
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>Flat Shipping</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text>{moneyFormat(item.flatShippingTotal, 'bzd')}</Text>
      </View>
    </View>
    <View
      style={{
        marginTop: 14,
        paddingTop: 12,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEF8FF',
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>
          Add'l Lbs {parseInt(item.extraPounds) > 0 && `(${item.extraPounds})`}
        </Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text>{moneyFormat(item.additionalPoundsTotal, 'bzd')}</Text>
      </View>
    </View>
    <View
      style={{
        marginTop: 14,
        paddingTop: 12,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEF8FF',
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>Shipping Total</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text category="s1">{moneyFormat(item.shippingTotal, 'bzd')}</Text>
      </View>
    </View>
    <Text category="s1" style={{marginTop: 25}}>
      Fees Total
    </Text>
    <View style={{marginTop: 14, flexDirection: 'row'}}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>GST</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text>{moneyFormat(item.tax, 'bzd')}</Text>
      </View>
    </View>
    <View
      style={{
        marginTop: 14,
        paddingTop: 12,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEF8FF',
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>Duty Rate</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text>{moneyFormat(item.duty, 'bzd')}</Text>
      </View>
    </View>
    <View
      style={{
        marginTop: 14,
        paddingTop: 12,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEF8FF',
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>Service Charge</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text>{moneyFormat(item.serviceCharge, 'bzd')}</Text>
      </View>
    </View>
    <View
      style={{
        marginTop: 14,
        paddingTop: 12,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEF8FF',
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>Insurance</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text>{moneyFormat(item.insurance, 'bzd')}</Text>
      </View>
    </View>
    <View
      style={{
        marginTop: 14,
        paddingTop: 12,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEF8FF',
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>Local Hialeah Pickup</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text>{moneyFormat(item.localPickup, 'bzd')}</Text>
      </View>
    </View>
    <View
      style={{
        marginTop: 14,
        paddingTop: 12,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEF8FF',
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text>Fees Total</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text category="s1">{moneyFormat(item.feesTotal, 'bzd')}</Text>
      </View>
    </View>
    <View
      style={{
        marginTop: 14,
        paddingTop: 12,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEF8FF',
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text category="s1">Item Total</Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text category="s1" style={{color: '#28a745'}}>
          {moneyFormat(item.overallTotal, 'bzd')}
        </Text>
      </View>
    </View>
  </View>
));

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
});
