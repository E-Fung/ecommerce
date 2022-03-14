import { combineReducers } from 'redux';
// import { productReducer } from './productReducer';
// import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';
import { userReducer } from './userReducer';

const appReducer = combineReducers({ cart: cartReducer, user: userReducer });

const CLEAR_ON_LOGOUT = 'CLEAR_ON_LOGOUT';
export const clearOnLogout = () => {
  return {
    type: CLEAR_ON_LOGOUT,
  };
};

const rootReducer = (state: any, action: any) => {
  if (action.type === CLEAR_ON_LOGOUT) {
    // set state to initial state
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
