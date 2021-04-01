import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/Home';
import ListingWebView from '../screens/ListingWebView';
import NewListingOrder from '../screens/NewListingOrder';

export default createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Recommended'
    }
  },
  ListingWebView: ListingWebView,
  NewOrderScreen: NewListingOrder,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#0079BF',
    },
    headerTitleStyle: {
      textAlign: 'center',
      flex:1 
    },
    headerTintColor: '#fff',
  }
});