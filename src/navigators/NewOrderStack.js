import React from 'react';
import {Icon} from 'react-native-ui-kitten';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {Header, HeaderBackButton} from 'react-navigation-stack';

import NewOrder from '../screens/NewOrder';
import CameraOrder from '../screens/CameraOrder';
import CameraRollSelect from '../screens/CameraRollSelect';

export default createStackNavigator({
  NewOrderScreen: {
    screen: NewOrder,
    navigationOptions: ({navigation}) => ({
      title: 'New Order',
      headerStyle: {
        backgroundColor: '#0079BF',
      },
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('CameraOrder')}>
          <Icon
            name="camera-outline"
            fill="#FFF"
            width={35}
            height={35}
            style={{marginRight: 20}}
          />
        </TouchableOpacity>
      ),
    }),
  },
  CameraOrder: {
    screen: CameraOrder,
    navigationOptions: {
      headerTransparent: true,
      headerTitleStyle: {
        color: '#FFF',
      },
      headerStyle: {
        elevation: 0,
      },
      headerTintColor: '#FFF',
      headerLeft: null,
    },
  },
  CameraRollSelect: {
    screen: CameraRollSelect,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      },
    },
  },
});
