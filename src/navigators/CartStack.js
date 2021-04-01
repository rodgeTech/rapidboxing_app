import { createStackNavigator } from 'react-navigation-stack';

import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import ListingWebView from '../screens/ListingWebView';

export default createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      title: 'Cart',
      headerTitleStyle: {
        textAlign: 'center',
        flex:1 
      },
    }
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: {
      title: 'Checkout'
    }
  },
  ListingWebView: ListingWebView,
}, {
  defaultNavigationOptions: {
    title: 'Add To Cart',
    headerStyle: {
      backgroundColor: '#0079BF',
    },
    headerTintColor: '#fff',
  }
});