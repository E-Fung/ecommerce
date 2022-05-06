import { ActionTypes } from '../constants/action-types';
import { Product } from '../../models/redux';

const initialState: Product | null = null;

export const detailReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_DETAIL:
      return action.product;
    case ActionTypes.DROP_DETAIL:
      return null;
    default:
      return state;
  }
};
