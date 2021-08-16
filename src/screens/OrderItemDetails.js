import React, {useEffect, useReducer} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text, Icon} from 'react-native-ui-kitten';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

import api from '../utils/api';

import {moneyFormat} from '../utils/money';
import InputScrollView from 'react-native-input-scroll-view';
import ParallaxCarousel from '../components/ParallaxCarousel';

const initialState = {
  loading: true,
  orderItem: {},
  image: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ORDER_ITEM_SUCCESS': {
      const {orderItem, image} = action;
      return {
        ...state,
        orderItem,
        image,
        loading: false,
      };
    }
    case 'GET_ORDER_ITEM_FAILURE':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default function OrderItemDetails({navigation}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const orderItemId = navigation.getParam('orderItemId', null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await api.get(`/order_items/${orderItemId}`);

        const {orderItem, image} = normalize(data);

        dispatch({
          type: 'GET_ORDER_ITEM_SUCCESS',
          image,
          orderItem,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (state.loading)
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;

  const item = build(state, 'orderItem', null)[0];
  const images = build(state, 'image', null);

  return (
    <InputScrollView showsVerticalScrollIndicator={false}>
      {images && (
        <View
          style={{
            backgroundColor: '#F2F6FF',
            paddingTop: 15,
            paddingBottom: 15,
          }}>
          <ParallaxCarousel images={images} />
        </View>
      )}
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
        <Text style={{marginTop: 25, color: '#2980b9', fontWeight: 'bold'}}>
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
        <Text
          category="s1"
          style={{marginTop: 25, color: '#2980b9', fontWeight: 'bold'}}>
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
              Add'l Lbs{' '}
              {parseInt(item.extraPounds) > 0 && `(${item.extraPounds})`}
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
        <Text
          category="s1"
          style={{marginTop: 25, color: '#2980b9', fontWeight: 'bold'}}>
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
            <Text category="h6" style={{color: '#2980b9', fontWeight: 'bold'}}>
              Item Total
            </Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text category="h6" style={{color: '#28a745'}}>
              {moneyFormat(item.overallTotal, 'bzd')}
            </Text>
          </View>
        </View>
      </View>
    </InputScrollView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
});
