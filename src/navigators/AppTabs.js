import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-ui-kitten';

import CartStack from './CartStack';
import YouStack from './YouStack';
import HomeStack from './HomeStack';
import NewOrderStack from './NewOrderStack';
import CalcStack from './CalcStack';
import {View} from 'react-native';
import CartCountIcon from '../components/CartCountIcon';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="home-outline" fill={tintColor} width={25} height={25} />
        ),
      },
    },
    NewOrder: {
      screen: NewOrderStack,
      navigationOptions: {
        tabBarLabel: 'Order',
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="shopping-bag-outline"
            fill={tintColor}
            width={25}
            height={25}
          />
        ),
      },
    },
    Calculator: {
      screen: CalcStack,
      navigationOptions: {
        tabBarLabel: 'Calculator',
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="smartphone-outline"
            fill={tintColor}
            width={25}
            height={25}
          />
        ),
      },
    },
    Cart: {
      screen: CartStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              name="shopping-cart-outline"
              fill={tintColor}
              width={25}
              height={25}
            />
            <CartCountIcon />
          </View>
        ),
      },
    },
    You: {
      screen: YouStack,
      navigationOptions: {
        tabBarLabel: 'You',
        tabBarIcon: ({tintColor}) => (
          <Icon name="person-outline" fill={tintColor} width={25} height={25} />
        ),
      },
    },
  },
  {
    lazy: false,
    tabBarOptions: {
      activeTintColor: '#FFF',
      inactiveTintColor: '#D9D9D9',
      showIcon: true,
      labelStyle: {
        fontSize: 13,
      },
      style: {
        backgroundColor: '#0079BF',
      },
    },
  },
);
