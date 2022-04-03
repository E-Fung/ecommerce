import { ActionTypes } from '../constants/action-types';
import { User } from '../../models/db';

export const fetch_User = (user: User) => {
  return {
    type: ActionTypes.FETCH_USER,
    user,
  };
};

export const drop_User = () => {
  return {
    type: ActionTypes.DROP_USER,
  };
};
