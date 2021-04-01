import React, {useEffect, useReducer} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {Layout} from 'react-native-ui-kitten';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../utils/api';
import RecommendedList from './home/RecommendedList';

const initialState = {
  fetchingListings: true,
  listingIds: [],
  listingsData: {},
  meta: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_LISTINGS_SUCCESS': {
      const {listingsData, listingIds, meta} = action;
      return {
        ...state,
        listingsData,
        listingIds,
        meta,
        fetchingListings: false,
      };
    }
    case 'GET_LISTINGS_FAILURE':
      return {...state, fetchingListings: false};
    default:
      return state;
  }
};

export default (Home = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function initialize() {
      OneSignal.promptForPushNotificationsWithUserResponse(() => {
        console.log('Permission callback');
      });

      const authToken = await AsyncStorage.getItem('tokenData');
      const token = JSON.parse(authToken);
      const userId = token['user_id'];

      OneSignal.setExternalUserId(`${userId}`);

      api
        .get('/listings')
        .then(({data}) => {
          const listingsData = normalize(data, {endpoint: '/listings'});
          const listingIds = listingsData.meta['/listings'].data.map(({id}) =>
            Number(id),
          );

          dispatch({
            type: 'GET_LISTINGS_SUCCESS',
            listingsData,
            listingIds,
            meta: data.meta,
          });
        })
        .catch(err => {
          dispatch({type: 'GET_LISTINGS_FAILURE'});
        });
    }

    initialize();
  }, []);

  if (state.fetchingListings)
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;

  const listingsData = build(state.listingsData, 'listing', null);
  const listings = state.listingIds.map(id =>
    listingsData.find(x => x.id === id),
  );
  const meta = state.meta;

  return (
    <Layout style={styles.container} level="2">
      <RecommendedList
        items={listings}
        shipmentSchedule={meta.shipment_schedule}
        navigate={navigation.navigate}
      />
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
