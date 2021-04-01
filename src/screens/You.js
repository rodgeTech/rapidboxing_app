import React, {useEffect, useReducer, useLayoutEffect} from 'react';
import {StyleSheet, ScrollView, View, ActivityIndicator} from 'react-native';
import {Layout, Text, Icon} from 'react-native-ui-kitten';
import AsyncStorage from '@react-native-community/async-storage';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import OneSignal from 'react-native-onesignal';

import api from '../utils/api';

import Menu from './you/Menu';

const initialState = {
  fetchingProfile: true,
  profile: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS': {
      const {profile} = action;
      return {
        ...state,
        profile,
        fetchingProfile: false,
      };
    }
    case 'GET_PROFILE_FAILURE':
      return {...state, fetchingProfile: false};
    default:
      return state;
  }
};

export default (You = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    async function fetchProfile() {
      api
        .get('/profile')
        .then(({data}) => {
          const profileData = normalize(data);
          const profile = build(profileData, 'user', null)[0];

          dispatch({type: 'GET_PROFILE_SUCCESS', profile});
        })
        .catch(err => {
          dispatch({type: 'GET_PROFILE_FAILURE'});
        });
    }
    fetchProfile();

    const navFocusListener = navigation.addListener('didFocus', () => {
      fetchProfile();
    });

    return () => {
      navFocusListener.remove();
    };
  }, []);

  const signOut = async () => {
    await api.setAuthToken('tokenData');
    api
      .del('/auth/sign_out')
      .then(async res => {
        try {
          await AsyncStorage.removeItem('tokenData');
          OneSignal.removeExternalUserId();
          navigation.navigate('Auth');
        } catch (error) {
          console.log('Something went wrong', error);
        }
      })
      .catch(err => {});
  };

  const {profile, fetchingProfile} = state;

  return (
    <Layout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{alignItems: 'center', marginVertical: 20, paddingTop: 20}}>
          <Icon name="person-outline" fill="#000" width={55} height={55} />
          {!fetchingProfile ? (
            <React.Fragment>
              <Text category="h6" style={{marginTop: 5}}>
                Hi, {profile.name}
              </Text>
              <Text category="h6" appearance="hint">
                {profile.email}
              </Text>
            </React.Fragment>
          ) : (
            <ActivityIndicator size="small" style={{marginTop: 20}} />
          )}
        </View>
        <Menu signOut={signOut} navigation={navigation} />
      </ScrollView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
