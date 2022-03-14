import { ActionTypes } from '../constants/action-types';
import { CartItem } from '../../models/redux';

export const add_Cart = (cartItem: CartItem) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    cartItem,
  };
};

export const got_Cart = (cart: CartItem[]) => {
  return {
    type: ActionTypes.GET_CART,
    cart,
  };
};
export const drop_Cart = () => {
  return {
    type: ActionTypes.GET_CART,
  };
};

export const adjust_Cart = (cartItem: CartItem) => {
  return {
    type: ActionTypes.GET_CART,
    cartItem,
  };
};
