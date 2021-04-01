import React, { createContext, useReducer } from 'react';

export const CartContext = createContext({});

const initialState = {
  fetchingCart: true,
  cart: {},
  lineItems: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_CART_SUCCESS': {
      const {
        cart,
        lineItems
      } = action;
      return {
        ...state,
        cart,
        lineItems,
        fetchingCart: false,
      };
    }
    case 'GET_CART_FAILURE':
      return {
        ...state,
        fetchingCart: false
      };
    case 'DELETE_CART_ITEM_SUCCESS': {
      const {
        lineItemId,
        cart
      } = action;
      const { [lineItemId]: value, ...updatedLineItems } = state.lineItems
      return {
        ...state,
        cart,
        lineItems: updatedLineItems
      };
    }
    case 'DELETE_CART_ITEM_FAILURE':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const CartProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartContext.Provider>
  );
}