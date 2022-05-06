import { combineReducers } from 'redux';
import { productsReducer } from './productsReducer';
import { cartReducer } from './cartReducer';
import { userReducer } from './userReducer';
import { detailReducer } from './detailReducer';

const appReducer = combineReducers({ cart: cartReducer, user: userReducer, products: productsReducer, detail: detailReducer });

const CLEAR_ON_LOGOUT = 'CLEAR_ON_LOGOUT';
export const clearOnLogout = () => {
  return {
    type: CLEAR_ON_LOGOUT,
  };
};

const rootReducer = (state: any, action: any) => {
  if (action.type === CLEAR_ON_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
