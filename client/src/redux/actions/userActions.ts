import { ActionTypes } from '../constants/action-types';
import { User } from '../../models/db';

export const set_Fetching_Status = (isFetching: boolean) => {
  return {
    type: ActionTypes.SET_FETCHING_STATUS,
    isFetching,
  };
};

//sets the user state after grabbing from db
export const got_User = (user: User) => {
  return {
    type: ActionTypes.GET_USER,
    user,
  };
};

export const drop_User = () => {
  return {
    type: ActionTypes.DROP_USER,
  };
};
