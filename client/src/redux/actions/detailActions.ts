import { ActionTypes } from '../constants/action-types';
import { Product } from '../../models/redux';

export const fetch_Detail = (product: Product) => {
  return {
    type: ActionTypes.FETCH_DETAIL,
    product,
  };
};

export const drop_Detail = () => {
  return {
    type: ActionTypes.DROP_DETAIL,
  };
};
