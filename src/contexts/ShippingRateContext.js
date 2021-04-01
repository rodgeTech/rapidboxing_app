import React, { createContext, useReducer } from 'react';

export const ShippingRateContext = createContext({});

const initialState = {
  fetchingShippingRates: true,
  shippingRates: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_SHIPPING_RATES_SUCCESS': {
      const {
        shippingRates,
      } = action;
      return {
        ...state,
        shippingRates,
        fetchingShippingRates: false,
      };
    }
    case 'GET_SHIPPING_RATES_FAILURE':
      return {
        ...state,
        fetchingShippingRates: false
      };
    default:
      return state;
  }
};

export const ShippingRateProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ShippingRateContext.Provider value={[state, dispatch]}>
      {props.children}
    </ShippingRateContext.Provider>
  );
}