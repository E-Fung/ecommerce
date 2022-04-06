import { ActionTypes } from '../constants/action-types';
import { Product, CartItem } from '../../models/redux';

export const fetch_Products = (products: Product[]) => {
  return {
    type: ActionTypes.FETCH_PRODUCTS,
    products,
  };
};

export const update_Product = (currCart: CartItem[]) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT,
    currCart,
  };
};
