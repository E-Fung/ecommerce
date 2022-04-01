import { ActionTypes } from '../constants/action-types';
import { CartItem } from '../../models/redux';

export const add_Cart = (cartItem: CartItem) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    cartItem,
  };
};

//add cart from db to state
export const got_Cart = (cart: CartItem[]) => {
  return {
    type: ActionTypes.GET_CART,
    cart,
  };
};

export const drop_Cart = () => {
  return {
    type: ActionTypes.DROP_CART,
  };
};

export const adjust_Cart = (cartItem: CartItem) => {
  return {
    type: ActionTypes.ADJUST_CART,
    cartItem,
  };
};

export const remove_Cart_Item = (cartItem: CartItem) => {
  return {
    type: ActionTypes.DELETE_CART_ITEM,
    cartItem,
  };
};
