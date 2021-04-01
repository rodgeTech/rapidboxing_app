import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Button, Layout, Text} from 'react-native-ui-kitten';

import {AUTH_BACKGROUND} from '../images';

export default (AuthHome = ({navigation}) => {
  const loadInBrowser = () => {
    Linking.openURL('https://www.mybelizecommerce.com/').catch(err =>
      console.error("Couldn't load page", err),
    );
  };
  return (
    <Layout style={styles.container}>
      <ImageBackground source={AUTH_BACKGROUND} style={styles.backgroundImage}>
        <Layout style={styles.content}>
          <Text category="h1" style={{color: '#fff'}}>
            Hi there...
          </Text>
          <Text
            style={{
              paddingTop: 5,
              marginBottom: 60,
              color: '#fff',
              fontSize: 17,
            }}
            appearance="alternative">
            You're one step away from the most awesome shopping experience in
            Belize!
          </Text>
          <Button
            onPress={() => navigation.navigate('SignIn')}
            style={{width: '100%', marginBottom: 20}}
            size="large">
            Sign In
          </Button>
          <Button
            status="basic"
            onPress={() => navigation.navigate('Register')}
            style={{width: '100%'}}
            size="large">
            Sign Up
          </Button>
        </Layout>

        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            padding: 10,
          }}>
          <TouchableOpacity onPress={loadInBrowser}>
            <Text
              style={{
                fontSize: 15,
                color: '#fff',
                textAlign: 'center',
              }}>
              developed by{' '}
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                }}
                status="info"
                category="label">
                mybelizecommerce.com
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,.25)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  icon: {
    width: 32,
    height: 32,
  },
});
