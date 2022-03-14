import { ActionTypes } from '../constants/action-types';
import { UserAction, User } from '../../models/redux';

const initialState: Partial<User> = { isFetching: true };

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    //check to see if cart has the product, if yes, increment by quantity, else push to array
    case ActionTypes.SET_FETCHING_STATUS:
      return { ...state, isFetching: action.isFetching };
    case ActionTypes.GET_USER:
      return action.user;
    default:
      return state;
  }
};
