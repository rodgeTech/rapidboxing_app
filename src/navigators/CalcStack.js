import { createStackNavigator } from 'react-navigation-stack';

import Calculator from '../screens/Calculator';
import Estimation from '../screens/Estimation';

export default createStackNavigator({
  Calculator: {
    screen: Calculator,
    navigationOptions: {
      title: 'Calculator',
      headerTitleStyle: {
        textAlign: 'center',
        flex:1 
      },
    }
  },
  Estimation: {
    screen: Estimation,
    navigationOptions: {
      title: 'Your Estimation'
    }
  },
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#0079BF',
    },
    headerTintColor: '#fff',
  }
});