import React, {createContext, useReducer} from 'react';

export const ListingContext = createContext({});

const initialState = {
  fetchingListing: true,
  listing: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_LISTING': {
      return {
        ...state,
        fetchingListing: true,
      };
    }
    case 'GET_LISTING_SUCCESS': {
      const {listing} = action;
      return {
        ...state,
        listing,
        fetchingListing: false,
      };
    }
    case 'GET_LISTING_FAILURE':
      return {
        ...state,
        fetchingListing: false,
      };
    case 'NO_LISTING': {
      return {...state, listing: {}, fetchingListing: false};
    }
    default:
      return state;
  }
};

export const ListingProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ListingContext.Provider value={[state, dispatch]}>
      {props.children}
    </ListingContext.Provider>
  );
};
