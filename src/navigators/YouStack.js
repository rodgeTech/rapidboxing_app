import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-ui-kitten';

import You from '../screens/You';
import ListingWebView from '../screens/ListingWebView';
import EditProfile from '../screens/EditProfile';
import MyOrders from '../screens/MyOrders';
import OrderDetails from '../screens/OrderDetails';
import OrderItems from '../screens/OrderItems';
import StatusTimeline from '../screens/StatusTimeline';


const OrderDetailsTabs = createMaterialTopTabNavigator({
  OrderSummary: {
    screen: OrderDetails,
    navigationOptions: {
      tabBarLabel: 'Summary',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='menu-2-outline' fill={tintColor} width={22} height={22} />
      )
    }
  },
  OrderItems: {
    screen: OrderItems,
    navigationOptions: {
      tabBarLabel: 'Items',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='shopping-bag-outline' fill={tintColor} width={22} height={22} />
      )
    }
  },
  StatusTimeline: {
    screen: StatusTimeline,
    navigationOptions: {
      tabBarLabel: 'Status',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='car-outline' fill={tintColor} width={22} height={22} />
      )
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: '#2980b9',
    inactiveTintColor: '#000',
    showIcon: true,
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 13
    },
    indicatorStyle: {
      backgroundColor: '#2980b9',
    },
    style: {
      backgroundColor: '#F3FAFF'
    }
  }
})

export default createStackNavigator({
  You: {
    screen: You,
    navigationOptions: {
      title: 'You',
      headerTitleStyle: {
        textAlign: 'center',
        flex:1 
      },
    }
  },
  MyOrders: {
    screen: MyOrders,
    navigationOptions: {
      title: 'Your Orders'
    }
  },
  OrderDetails: {
    screen: OrderDetailsTabs,
    navigationOptions: ({ navigation }) => {
      const title = navigation.getParam("title") || 'Order Details'
      return {
        title: title
      }
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      title: 'Edit Profile'
    }
  },
  ListingWebView: {
    screen: ListingWebView,
  }
}, {
  defaultNavigationOptions: {
    title: 'Add To Cart',
    headerStyle: {
      backgroundColor: '#0079BF',
    },
    headerTintColor: '#fff',
  }
});