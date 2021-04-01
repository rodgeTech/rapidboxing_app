import React, {useEffect, useReducer} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Layout} from 'react-native-ui-kitten';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import InputScrollView from 'react-native-input-scroll-view';

import Form from './editProfile/Form';
import api from '../utils/api';

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

export default (EditProfile = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
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
  }, []);

  const update = (values, setStatus, setSubmitting) => {
    api
      .put('/auth', values)
      .then(() => {
        setSubmitting(false);
        navigation.navigate('You');
      })
      .catch(({data}) => {
        setStatus({error: data.errors.full_messages[0]});
      });
  };

  const {profile, fetchingProfile} = state;

  if (fetchingProfile)
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;

  return (
    <Layout style={styles.container}>
      <InputScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingVertical: 40}}>
        <Form onUpdate={update} profile={profile} />
      </InputScrollView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
