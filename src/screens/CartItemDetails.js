import React, {useEffect, useReducer} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

import api from '../utils/api';

const initialState = {
  fetchingLineItem: true,
  lineItem: {},
  image: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_LINE_ITEM_SUCCESS': {
      const {lineItem, image} = action;
      return {
        ...state,
        lineItem,
        image,
        fetchingLineItem: false,
      };
    }
    case 'GET_LINE_ITEM_FAILURE':
      return {
        ...state,
        fetchingLineItem: false,
      };
    default:
      return state;
  }
};

export default function CartItemDetails({navigation}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const lineItemId = navigation.getParam('lineItemId', null);

  useEffect(() => {
    api
      .get(`/line_items/${lineItemId}`)
      .then(({data}) => {
        const {lineItem, image} = normalize(data);

        dispatch({
          type: 'GET_LINE_ITEM_SUCCESS',
          image,
          lineItem,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (state.fetchingLineItem) {
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;
  }

  const lineItemData = build(state, 'lineItem', null)[0];
  const imagesData = build(state, 'image', null);

  return <Text>Hello</Text>;
}
