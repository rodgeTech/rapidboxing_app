import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-ui-kitten';

import {moneyFormat} from '../../utils/money';

export default (OrderItem = ({item, navigation}) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('OrderItemDetails', {orderItemId: item.id})
    }>
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
    </View>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
});
