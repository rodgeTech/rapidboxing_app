import React from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Layout, Text} from 'react-native-ui-kitten';
import InputScrollView from 'react-native-input-scroll-view';

import api from '../utils/api';
import Form from './register/Form';

import {useSpinner} from '../hooks/useSpinner';
import {BOX_BACKGROUND} from '../images';

export default (Register = ({navigation}) => {
  const {show: showSpinner, hide: hideSpinner, RenderSpinner} = useSpinner();

  const onRegister = (values, setStatus, setSubmitting, resetForm) => {
    showSpinner();
    setSubmitting(true);

    api
      .post('/auth', {...values, confirm_success_url: '/'})
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

        resetForm();
        hideSpinner();
        setSubmitting(false);

        navigation.navigate('App');
      })
      .catch(({data}) => {
        hideSpinner();
        setSubmitting(false);
        setStatus({error: data.errors.full_messages[0]});
      });
  };

  return (
    <React.Fragment>
      <InputScrollView showsVerticalScrollIndicator={false}>
        <RenderSpinner />
        <ImageBackground
          source={BOX_BACKGROUND}
          style={styles.headerBackgroundImage}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.35)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text category="h1" style={{color: '#fff'}}>
              Join us
            </Text>
            <Text
              style={{paddingTop: 10, color: '#fff', fontSize: 17}}
              appearance="alternative">
              Create your account today
            </Text>
          </View>
        </ImageBackground>
        <Layout style={styles.container}>
          <Form onRegister={onRegister} />
          <Text appearance="hint" category="s1">
            Already have an account?{' '}
            <Text
              category="s1"
              status="info"
              onPress={() => navigation.navigate('SignIn')}>
              Sign in
            </Text>
          </Text>
          <Text
            appearance="hint"
            style={{
              fontSize: 14,
              textAlign: 'center',
              paddingBottom: 20,
            }}>
            developed by mybelizecommerce.com
          </Text>
        </Layout>
      </InputScrollView>
    </React.Fragment>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
  },
  header: {
    height: 300,
  },
  headerBackgroundImage: {
    resizeMode: 'cover',
    height: 300,
  },
});
