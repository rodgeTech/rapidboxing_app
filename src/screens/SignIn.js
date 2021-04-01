import React from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {Layout, Text} from 'react-native-ui-kitten';
import AsyncStorage from '@react-native-community/async-storage';
import InputScrollView from 'react-native-input-scroll-view';

import api from '../utils/api';
import Form from './signIn/Form';
import {useSpinner} from '../hooks/useSpinner';
import {BOXES_BACKGROUND} from '../images';

export default (SignIn = ({navigation}) => {
  const {show: showSpinner, hide: hideSpinner, RenderSpinner} = useSpinner();

  const onSignIn = (values, setStatus, setSubmitting) => {
    showSpinner();
    setSubmitting(true);

    api
      .post('/auth/sign_in', values)
      .then(async ({data, headers}) => {
        const tokenData = {
          user_id: data.data.id,
          auth_token: headers['access-token'],
          client: headers['client'],
          uid: headers['uid'],
          expiry: headers['expiry'],
        };
        await AsyncStorage.setItem('tokenData', JSON.stringify(tokenData));
        await api.setAuthToken('tokenData');

        setSubmitting(false);
        hideSpinner();
        navigation.navigate('App');
      })
      .catch(({data}) => {
        setSubmitting(false);
        hideSpinner();
        setStatus({error: data.errors[0]});
      });
  };

  return (
    <InputScrollView showsVerticalScrollIndicator={false}>
      <RenderSpinner />
      <ImageBackground
        source={BOXES_BACKGROUND}
        style={styles.headerBackgroundImage}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.35)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text category="h1" style={{color: '#fff'}}>
            Almost there
          </Text>
          <Text
            style={{paddingTop: 10, color: '#fff', fontSize: 17}}
            appearance="alternative">
            Just sign in to your account
          </Text>
        </View>
      </ImageBackground>
      <Layout style={styles.container}>
        <Form onSignIn={onSignIn} />
        <Text appearance="hint" category="s1">
          Don't have an account?{' '}
          <Text
            category="s1"
            status="info"
            onPress={() => navigation.navigate('Register')}>
            Create one
          </Text>
        </Text>
        <Text
          appearance="hint"
          style={{
            fontSize: 14,
            textAlign: 'center',
          }}>
          developed by mybelizecommerce.com
        </Text>
      </Layout>
    </InputScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#FFF',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 300,
  },
  headerBackgroundImage: {
    resizeMode: 'cover',
    height: 300,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
