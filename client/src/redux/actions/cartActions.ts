import { ActionTypes } from '../constants/action-types';
import { CartItem } from '../../models/redux';

export const add_Cart = (payload: CartItem) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload,
  };
};

export const got_Cart = (payload: CartItem[]) => {
  return {
    type: ActionTypes.GET_CART,
    payload,
  };
};
export const drop_Cart = () => {
  return {
    type: ActionTypes.GET_CART,
  };
};

export const adjust_Cart = (payload: CartItem) => {
  return {
    type: ActionTypes.GET_CART,
    payload,
  };
};
