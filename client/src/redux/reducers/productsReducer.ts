import { ActionTypes } from '../constants/action-types';
import { Product, ProductsAction } from '../../models/redux';
import { updateProduct } from '../utils/reducerFunctions';

const initialState: Product[] = [];

export const productsReducer = (state = initialState, action: ProductsAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS:
      return action.products;
    case ActionTypes.UPDATE_PRODUCT:
      return updateProduct(state, action.currCart!);
    default:
      return state;
  }
};
