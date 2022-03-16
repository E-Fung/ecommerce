import { ActionTypes } from '../constants/action-types';
import { Product } from '../../models/redux';

export const got_Products = (products: Product[]) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    products,
  };
};
