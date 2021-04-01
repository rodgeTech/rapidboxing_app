import React, {useEffect, useContext} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import {Layout} from 'react-native-ui-kitten';
import InputScrollView from 'react-native-input-scroll-view';

import {ShippingRateContext} from '../contexts/ShippingRateContext';
import {useSpinner} from '../hooks/useSpinner';

import api from '../utils/api';
import Form from './calculator/Form';

const Calculator = ({navigation}) => {
  const [shippingRateState, shippingRateDispatch] = useContext(
    ShippingRateContext,
  );

  const {show: showSpinner, hide: hideSpinner, RenderSpinner} = useSpinner();

  useEffect(() => {
    api
      .get('/settings/shipping_rates')
      .then(({data}) => {
        const shippingRates = normalize(data);

        console.log(shippingRates.weightShippingRate[15])

        shippingRateDispatch({
          type: 'GET_SHIPPING_RATES_SUCCESS',
          shippingRates,
        });
      })
      .catch(err => {
        shippingRateDispatch({type: 'GET_SHIPPING_RATES_FAILURE'});
      });
  }, []);

  const calculate = (values, resetForm) => {
    console.log("MEEE", values)
    showSpinner();
    const {
      quantity,
      shippingRate,
      price,
      extraPounds,
      localPickup,
    } = values;
    const params = {
      quantity,
      price,
      shipping_rate_id: shippingRate.id,
      extra_pounds: extraPounds,
      local_pickup: localPickup,
    };

    api
      .get('/calculator', params)
      .then(({data}) => {
        resetForm();
        hideSpinner();
        console.log("LUS", shippingRateState)
        const calculatedValues = {...data, shippingRate: shippingRateState.shippingRates.weightShippingRate[params.shipping_rate_id].attributes}
        navigation.navigate('Estimation', {calculatedValues});
      })
      .catch(err => {
        hideSpinner();
        console.log(err);
      });
  };

  if (shippingRateState.fetchingShippingRates) {
    return <ActivityIndicator size="large" style={{marginTop: 30}} />;
  }

  const shippingRates = build(
    shippingRateState.shippingRates,
    'weightShippingRate',
    null,
  );

  const selectRatesData = shippingRates.map(rate => ({
    id: rate.id,
    text: `${rate.name} (${rate.minOrderWeight}lb - ${
      rate.maxOrderWeight
    }lb) = ${rate.rateAmount}`,
  }));

  return (
    <React.Fragment>
      <RenderSpinner />
      <Layout style={styles.container}>
        <InputScrollView showsVerticalScrollIndicator={false}>
          <Form rates={selectRatesData} calculate={calculate} />
        </InputScrollView>
      </Layout>
    </React.Fragment>
  );
};


export default Calculator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
