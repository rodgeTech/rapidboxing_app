import { createStackNavigator } from 'react-navigation-stack';

import NewOrder from '../screens/NewOrder';

export default createStackNavigator({
  NewOrderScreen: NewOrder,
}, {
  defaultNavigationOptions: {
    title: 'Add To Cart',
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
