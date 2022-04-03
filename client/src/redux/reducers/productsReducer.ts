import { ActionTypes } from '../constants/action-types';
import { Product, ProductsAction } from '../../models/redux';

const initialState: Product[] = [];

export const productsReducer = (state = initialState, action: ProductsAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
