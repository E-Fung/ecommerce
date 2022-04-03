import { ActionTypes } from '../constants/action-types';
import { Product } from '../../models/redux';

export const fetch_Products = (products: Product[]) => {
  return {
    type: ActionTypes.FETCH_PRODUCTS,
    products,
  };
};
