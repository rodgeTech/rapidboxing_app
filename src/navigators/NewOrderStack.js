import React from 'react';
import {Icon} from 'react-native-ui-kitten';
import {TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import NewOrder from '../screens/NewOrder';
import CameraOrder from '../screens/CameraOrder';
import NewOrderRollPicker from '../screens/NewOrderRollPicker';

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
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewOrderRollPicker')}>
            <Icon
              name="upload-outline"
              fill="#FFF"
              width={32}
              height={32}
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CameraOrder')}>
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
  NewOrderRollPicker: {
    screen: NewOrderRollPicker,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#0079BF',
        elevation: 0,
      },
      headerTintColor: '#fff',
    },
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
});
