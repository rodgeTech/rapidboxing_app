import React, {useEffect, useReducer} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

import api from '../utils/api';

const initialState = {
  fetchingOrder: true,
  order: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ORDER_SUCCESS': {
      const {order} = action;
      return {
        ...state,
        order,
        fetchingOrder: false,
      };
    }
    case 'GET_ORDER_FAILURE':
      return {
        ...state,
        fetchingOrder: false,
      };
    default:
      return state;
  }
};

export default (StatusTimeline = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const orderId = navigation.getParam('orderId', null);

  let statusesData = [
    {
      title: 'Pending',
      description:
        'Your order is pending. We are awaiting the first deposit to confirm and process your order.',
      circleColor: '#ccc',
    },
    {
      title: 'Confirmed',
      description:
        'First deposit received. Your order has now been confirmed and is currently being processed.',
    },
    {
      title: 'Order Arrived',
      description:
        'Order has arrived at our warehouse and is awaiting shipment.',
    },
    {
      title: 'Being Shipped',
      description:
        "Your order has now departed from our USA warehouse and is on it's way to Belize.",
    },
    {
      title: 'Arrived',
      description:
        'Your order has arrived to our Belize warehouse and will be dispatched to your location momentarily.',
    },
    {
      title: 'Out For Delivery',
      description: 'Your order is now on the way to your location.',
    },
  ];

  useEffect(() => {
    api
      .get(`/orders/${orderId}`)
      .then(({data}) => {
        const order = normalize(data);

        dispatch({type: 'GET_ORDER_SUCCESS', order});
      })
      .catch(() => {
        dispatch({type: 'GET_ORDER_FAILURE'});
      });
  }, []);

  const buildStatusesData = (currentStatusEnum, statusesEnum) => {
    for (const [index] of statusesEnum.entries()) {
      if (
        currentStatusEnum === 'out_for_delivery' &&
        statusesEnum.indexOf(currentStatusEnum) == index
      ) {
        statusesData[index].circleColor = '#1084E9';
        statusesData[index].lineColor = '#1084E9';
      } else if (statusesEnum.indexOf(currentStatusEnum) == index) {
        statusesData[index].circleColor = '#1084E9';
        statusesData[index].lineColor = '#1084E9';
      }
      if (statusesEnum.indexOf(currentStatusEnum) > index) {
        statusesData[index].circleColor = '#1084E9';
        statusesData[index].lineColor = '#1084E9';
      }
    }
  };

  if (state.fetchingOrder)
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;

  const orderData = build(state.order, 'order', null);
  const order = orderData[0];

  const statusesEnum = order.statusesEnum;
  const currentStatusEnum = order.statusEnum;

  buildStatusesData(currentStatusEnum, statusesEnum);

  return (
    <View style={styles.container}>
      <Timeline
        showTime={false}
        innerCircle={'dot'}
        data={statusesData}
        descriptionStyle={{color: 'gray'}}
        circleColor="#EAEAEA"
        lineColor="#EAEAEA"
        titleStyle={{fontWeight: 'normal', fontSize: 14}}
        separator
        separatorStyle={{backgroundColor: '#EBF7FF'}}
        detailContainerStyle={{paddingBottom: 20}}
        options={{showsVerticalScrollIndicator: false}}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    paddingRight: 30,
    backgroundColor: 'white',
  },
});
