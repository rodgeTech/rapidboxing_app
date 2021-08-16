import React, {useContext, useEffect, useReducer} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Linking,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {StackActions} from 'react-navigation';
import {Layout, Text} from 'react-native-ui-kitten';
import build from 'redux-object';
import normalize from 'json-api-normalizer';
import InputScrollView from 'react-native-input-scroll-view';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import api from '../utils/api';
import Form from './checkout/Form';
import {useSpinner} from '../hooks/useSpinner';
import {CartContext} from '../contexts/CartContext';

Geocoder.init('AIzaSyAb-ZVZZcZ990rdwVsBYbypUbrGX3znTzA');

const initialState = {
  profile: {},
  fetchingProfile: true,
  addressLoading: true,
  address: '',
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
    case 'GET_LOCATION_SUCCESS': {
      const {address} = action;
      return {
        ...state,
        address,
        addressLoading: false,
      };
    }
    case 'GET_LOCATION_FAILURE':
      return {...state, address: '', addressLoading: false};
    default:
      return state;
  }
};

export default (Checkout = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [cartState, cartDispatch] = useContext(CartContext);

  const {show: showSpinner, hide: hideSpinner, RenderSpinner} = useSpinner();

  const hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${
          appConfig.displayName
        }" to determine your shipping address.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  useEffect(() => {
    async function getLocation() {
      const permissionGranted = await hasLocationPermission();

      if (!permissionGranted) {
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(({results}) => {
              const res = results[0];
              const street = res.address_components[0].short_name;
              const city = res.address_components[1].long_name;
              const district = res.address_components[2].long_name;
              const address = `${street}, ${city}, ${district}`;

              dispatch({
                type: 'GET_LOCATION_SUCCESS',
                address: address,
              });
            })
            .catch(error => {
              console.warn(error);
              dispatch({
                type: 'GET_LOCATION_FAILURE',
              });
            });
        },
        error => {
          console.log(error.code, error.message);
          dispatch({
            type: 'GET_LOCATION_FAILURE',
          });
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    getLocation();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      await api.setAuthToken('tokenData');
      api
        .get('/profile')
        .then(({data}) => {
          const profile = normalize(data);

          dispatch({
            type: 'GET_PROFILE_SUCCESS',
            profile,
          });
        })
        .catch(error => {
          dispatch({
            type: 'GET_PROFILE_FAILURE',
          });
        });
    }
    fetchProfile();
  }, []);

  const createCheckout = values => {
    showSpinner();
    api
      .post('/orders', {
        name: values.name,
        email: values.email,
        contact_number: values.contactNumber,
        address: values.address,
      })
      .then(res => {
        hideSpinner();
        cartDispatch({type: 'RESET_CART'});
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('MyOrders');
      })
      .catch(err => {
        hideSpinner();
        console.log(err);
      });
  };

  if (state.fetchingProfile)
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;

  const profile = build(state.profile, 'user', null);

  const {addressLoading, address} = state;

  return (
    <Layout style={styles.container} level="1">
      <RenderSpinner />
      <InputScrollView
        style={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#0079BF',
            paddingHorizontal: 16,
          }}>
          <Text category="h5" style={{color: '#fff'}}>
            Submit your order
          </Text>
          <Text style={{color: '#fff'}}>
            Enter the details below to proceed
          </Text>
        </View>
        <View
          style={{
            marginBottom: 30,
            paddingVertical: 4,
            paddingHorizontal: 10,
            backgroundColor: '#EBF7FF',
          }}>
          <Text style={{fontSize: 14}}>
            Please note your order total is viable to change. We will notify you
            of any such changes.
          </Text>
        </View>
        <View style={{paddingBottom: 25, paddingHorizontal: 16}}>
          <Form
            checkout={createCheckout}
            profile={profile[0]}
            addressLoading={addressLoading}
            address={address}
          />
        </View>
      </InputScrollView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
