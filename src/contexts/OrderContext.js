import React, {createContext, useReducer} from 'react';

export const OrderContext = createContext({});

const initialState = {
  images: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_IMAGES': {
      const {images} = action;
      return {
        ...state,
        images,
      };
    }
    default:
      return state;
  }
};

export const OrderProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OrderContext.Provider value={[state, dispatch]}>
      {props.children}
    </OrderContext.Provider>
  );
};
