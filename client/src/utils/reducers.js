import { useReducer } from 'react';
import {
  ADD_MULTIPLE_TO_CART,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART,
  UPDATE_CART_QUANTITY,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_PRODUCTS
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products]
      };
    // if action type value is the value of ` UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories]
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products]
      };
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        })
      };
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };
    default:
      // if it's none of these actions, do not update state at all and keep things the same! This is in case we accidentally execute an action that isn't predefined
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
