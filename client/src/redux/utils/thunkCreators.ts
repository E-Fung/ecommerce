import axios from 'axios';
import { add_Cart, got_Cart, drop_Cart, adjust_Cart, remove_Cart_Item } from '../actions/cartActions';
import { got_User, drop_User } from '../actions/userActions';
import { got_Products } from '../actions/productsActions';
import { CartItem, Product } from '../../models/redux';
import { Dispatch } from 'redux';

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

// if (props.user.isFetchingUser) {
//   return <div>Loading...</div>;
// }^in route page

// check if user is appended to req already, if yes, add to store
// sets fetching to false

//on login, return everything, pw is encrptyed

export const fetchUser = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:5000/auth/user');
    dispatch(got_User(data));
  } catch (error) {
    console.error(error);
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

export const logout = () => async (dispatch: any) => {
  try {
    await axios.delete('http://localhost:5000/auth/logout');
    await localStorage.removeItem('messenger-token');
    dispatch(drop_User());
    dispatch(drop_Cart());
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
    console.error(error);
  }
};

//update the database, then pull and override the cart
export const fetchCart = (currCart: CartItem[]) => async (dispatch: Dispatch) => {
  let promiseArray: any[] = [];
  if (currCart) {
    //integrates carts is exist
    currCart.forEach(async (product: CartItem) => {
      promiseArray.push(axios.post('http://localhost:5000/cart', product));
    });
  }
  await Promise.all(promiseArray);
  const { data } = await axios.get('http://localhost:5000/cart');
  dispatch(got_Cart(data));
};

export const dropCart = () => async (dispatch: Dispatch) => {
  try {
    dispatch(drop_Cart());
  } catch (error) {
    console.error(error);
  }
};

export const adjustCart = (params: CartItem) => async (dispatch: Dispatch) => {
  try {
    await axios.post('http://localhost:5000/adjustCart', params);
    dispatch(adjust_Cart(params));
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartItem = (params: CartItem) => async (dispatch: Dispatch) => {
  try {
    await axios.post('http://localhost:5000/deleteCartItem', params);
    dispatch(remove_Cart_Item(params));
  } catch (error) {
    console.error(error);
  }
};

//PRODUCT

export const fetchProducts = (params: string) => async (dispatch: Dispatch) => {
  try {
    let { data }: { data: Product[] } = await axios.get(`http://localhost:5000/product?category=${params}`);
    dispatch(got_Products(data));
  } catch (error) {
    console.error(error);
  }
};
