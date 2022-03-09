import axios from 'axios';
import { add_Cart, got_Cart, drop_Cart, adjust_Cart } from '../actions/cartActions';
import { CartItem } from '../../models/redux';
import { Dispatch } from 'redux';

//CART

//if user is logged in, add to database, else just add to store
export const addCart = (params: CartItem) => async (dispatch: Dispatch) => {
  try {
    if (params.UserId) {
      await axios.post('http://localhost:5000/cart', params);
    }
    dispatch(add_Cart(params));
  } catch (error) {
    console.log(error);
  }
};

//thunk database action reducer reducerfunction
export const fetchCart = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:5000/cart'); //setup route such that it uses tkn to find user
    dispatch(got_Cart(data));
  } catch (error) {
    console.log(error);
  }
};

export const dropCart = () => async (dispatch: Dispatch) => {
  try {
    dispatch(drop_Cart());
  } catch (error) {
    console.log(error);
  }
};

export const adjustCart = (params: CartItem) => async (dispatch: Dispatch) => {
  try {
    dispatch(adjust_Cart(params));
  } catch (error) {
    console.log(error);
  }
};
