import React, {createContext, useReducer} from 'react';

export const OrderContext = createContext({});

const initialState = {
  images: [],
  editImages: [],
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
    case 'REMOVE_IMAGE': {
      const {image} = action;
      const images = state.images.filter(orderImage => orderImage != image);
      return {
        ...state,
        images,
      };
    }
    case 'SET_EDIT_IMAGES': {
      const {editImages} = action;
      return {
        ...state,
        editImages,
      };
    }
    case 'REMOVE_EDIT_IMAGE': {
      const {editImage} = action;
      const editImages = state.editImages.filter(
        orderImage => orderImage != editImage,
      );
      return {
        ...state,
        editImages,
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
