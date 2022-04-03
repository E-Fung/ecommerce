import { ActionTypes } from '../constants/action-types';
import { UserAction, User } from '../../models/redux';

const initialState: Partial<User> = {};

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return action.user;
    case ActionTypes.DROP_USER:
      return {};
    default:
      return state;
  }
};
