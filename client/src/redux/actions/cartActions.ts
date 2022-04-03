import { ActionTypes } from '../constants/action-types';
import { CartItem } from '../../models/redux';

export const fetch_Cart = (cart: CartItem[]) => {
  return {
    type: ActionTypes.FETCH_CART,
    cart,
  };
};

export const drop_Cart = () => {
  return {
    type: ActionTypes.DROP_CART,
  };
};

export const add_To_Cart = (cartItem: CartItem) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    cartItem,
  };
};

export const adjust_Cart_Item = (cartItem: CartItem) => {
  return {
    type: ActionTypes.ADJUST_CART_ITEM,
    cartItem,
  };
};

export const remove_Cart_Item = (cartItem: CartItem) => {
  return {
    type: ActionTypes.DELETE_CART_ITEM,
    cartItem,
  };
};
