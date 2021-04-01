import {createStackNavigator} from 'react-navigation-stack';

import AuthHome from '../screens/AuthHome';
import SignIn from '../screens/SignIn';
import Register from '../screens/Register';

export default createStackNavigator(
  {
    AuthHome: {
      screen: AuthHome,
    },
    SignIn: {
      screen: SignIn,
      path: 'signin',
    },
    Register: {
      screen: Register,
    },
  },
  {
    defaultNavigationOptions: {
      headerTransparent: true,
      headerTintColor: '#fff',
    },
  },
);
