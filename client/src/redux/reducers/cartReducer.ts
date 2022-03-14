import { ActionTypes } from '../constants/action-types';
import { CartItem, CartAction } from '../../models/redux';
import { addItemToCart, adjustCart } from '../utils/reducerFunctions';

const initialState: CartItem[] = [];

export const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    //check to see if cart has the product, if yes, increment by quantity, else push to array
    case ActionTypes.ADD_TO_CART:
      return addItemToCart(state, action.cartItem!);
    case ActionTypes.ADJUST_CART:
      return adjustCart(state, action.cartItem!);
    case ActionTypes.DROP_CART:
      return undefined;
    case ActionTypes.GET_CART:
      return action.cart;
    default:
      return state;
  }
};
