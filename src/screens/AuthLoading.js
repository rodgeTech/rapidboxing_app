import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../utils/api';

const AuthLoading = ({navigation}) => {
  useEffect(() => {
    async function appFlow() {
      const authToken = await AsyncStorage.getItem('tokenData');
      if (authToken) {
        await api.setAuthToken('tokenData');
        api
          .get('/auth/validate_token')
          .then(res => {
            navigation.navigate('App');
          })
          .catch(error => {
            if (401 === error.status) {
              navigation.navigate('Auth');
            }
          });
      } else {
        navigation.navigate('Auth');
      }
    }
    appFlow();
  }, []);

  return <View style={styles.container} />;
};

export default AuthLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});
