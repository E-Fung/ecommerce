import { ActionTypes } from '../constants/action-types';
import { CartItem, CartAction } from '../../models/redux';
import { addItemToCart, adjustCartItem, deleteItemFromCart } from '../utils/reducerFunctions';

const initialState: CartItem[] = [];

export const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_CART:
      return action.cart;
    case ActionTypes.DROP_CART:
      return [];
    case ActionTypes.ADD_TO_CART:
      return addItemToCart(state, action.cartItem!);
    case ActionTypes.ADJUST_CART_ITEM:
      return adjustCartItem(state, action.cartItem!);
    case ActionTypes.DELETE_CART_ITEM:
      return deleteItemFromCart(state, action.cartItem!);
    default:
      return state;
  }
};
