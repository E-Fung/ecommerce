import { ActionTypes } from '../constants/action-types';
import { CartItem, CartPayload } from '../../models/redux';
import { addItemToCart, adjustCart } from '../utils/reducerFunctions';

const initialState: CartItem[] = [];

export const cartReducer = (state = initialState, { type, payload }: CartPayload) => {
  switch (type) {
    //check to see if cart has the product, if yes, increment by quantity, else push to array
    case ActionTypes.ADD_TO_CART:
      return addItemToCart(state, payload);
    case ActionTypes.ADJUST_CART:
      return adjustCart(state, payload);
    case ActionTypes.DROP_CART:
      return undefined;
    case ActionTypes.GET_CART:
      return payload;
    default:
      return state;
  }
};
