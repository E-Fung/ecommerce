import axios from 'axios';
import { add_Cart, got_Cart, drop_Cart, adjust_Cart } from '../actions/cartActions';
import { CartItem } from '../../models/redux';
import { Dispatch } from 'redux';
import { set_Fetching_Status, got_User } from '../actions/userActions';

// JWT
axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem('messenger-token')!;
  config!.headers!['x-access-token'] = token;

  return config;
});

//USER
//fetchUser is run in useEffect in route page
//fetchesUser via thunks
//dispatch SET FETCHING STATUS, sets user state to isFetching
//

// if (props.user.isFetchingUser) {
//   return <div>Loading...</div>;
// }^in route page

// check if user is appended to req already, if yes, add to store
// sets fetching to false

//on login, return everything, pw is encrptyed

export const fetchUser = () => async (dispatch: Dispatch) => {
  dispatch(set_Fetching_Status(true));
  try {
    const { data } = await axios.get('http://localhost:5000/auth/user');
    dispatch(got_User(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(set_Fetching_Status(false));
  }
};

export const register = (credentials: { name: string; email: string; password: string }) => async (dispatch: any) => {
  try {
    const { data } = await axios.post('http://localhost:5000/auth/register', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(got_User(data));
  } catch (error) {
    console.error(error);
  }
};

export const login = (credentials: { email: string; password: string }) => async (dispatch: any) => {
  try {
    const { data } = await axios.post('http://localhost:5000/auth/login', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(got_User(data));
  } catch (error) {
    console.error(error);
  }
};

//CART
//if user is logged in, add to database, else just add to store
export const addCart = (params: CartItem) => async (dispatch: Dispatch) => {
  try {
    if (params.userId) {
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
