import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-ui-kitten';

import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import EditLineItem from '../screens/EditLineItem';
import EditLineItemRollPicker from '../screens/EditLineItemRollPicker';
import ListingWebView from '../screens/ListingWebView';

export default createStackNavigator(
  {
    Cart: {
      screen: Cart,
      navigationOptions: {
        title: 'Cart',
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
      },
    },
    Checkout: {
      screen: Checkout,
      navigationOptions: {
        title: 'Checkout',
      },
    },
    ListingWebView: ListingWebView,
    EditLineItem: {
      screen: EditLineItem,
      navigationOptions: ({navigation}) => ({
        title: 'Edit Cart Item',
        headerStyle: {
          backgroundColor: '#0079BF',
        },
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
        headerTintColor: '#fff',
        headerRight: () => (
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditLineItemRollPicker')}>
              <Icon
                name="upload-outline"
                fill="#FFF"
                width={32}
                height={32}
                style={{marginRight: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CameraOrder')}>
              <Icon
                name="camera-outline"
                fill="#FFF"
                width={32}
                height={32}
                style={{marginRight: 20}}
              />
            </TouchableOpacity>
          </View>
        ),
      }),
    },
    EditLineItemRollPicker: EditLineItemRollPicker,
  },
  {
    defaultNavigationOptions: {
      title: 'Add To Cart',
      headerStyle: {
        backgroundColor: '#0079BF',
      },
      headerTintColor: '#fff',
    },
  },
);
