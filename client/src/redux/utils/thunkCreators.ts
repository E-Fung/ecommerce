import axios from 'axios';
import { add_To_Cart, fetch_Cart, drop_Cart, adjust_Cart_Item, remove_Cart_Item } from '../actions/cartActions';
import { fetch_User, drop_User, update_User } from '../actions/userActions';
import { fetch_Products, update_Product } from '../actions/productsActions';
import { fetch_Detail, drop_Detail } from '../actions/detailActions';
import { CartItem, Product } from '../../models/redux';
import { Dispatch } from 'redux';

// JWT
axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem('messenger-token')!;
  config!.headers!['x-access-token'] = token;

  return config;
});

//USER
export const fetchUser = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('https://neat-shell-349400.uc.r.appspot.com/auth/user');
    dispatch(fetch_User(data));
  } catch (error) {
    console.error(error);
  }
};

export const register = (credentials: { name: string; email: string; password: string }) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.post('https://neat-shell-349400.uc.r.appspot.com/auth/register', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(fetch_User(data));
  } catch (error) {
    console.error(error);
  }
};

export const login = (credentials: { email: string; password: string }) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.post('https://neat-shell-349400.uc.r.appspot.com/auth/login', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(fetch_User(data));
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.delete('https://neat-shell-349400.uc.r.appspot.com/auth/logout');
    await localStorage.removeItem('messenger-token');
    dispatch(drop_User());
    dispatch(drop_Cart());
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = (photoUrl: string) => async (dispatch: Dispatch) => {
  try {
    await axios.post('https://neat-shell-349400.uc.r.appspot.com/user', { photoUrl: photoUrl });
    dispatch(update_User(photoUrl));
  } catch (error) {
    console.error(error);
  }
};

//CART
export const fetchCart = (currCart: CartItem[]) => async (dispatch: Dispatch) => {
  let promiseArray: any[] = [];
  if (currCart) {
    currCart.forEach(async (product: CartItem) => {
      promiseArray.push(axios.post('https://neat-shell-349400.uc.r.appspot.com/cart', product));
    });
  }
  await Promise.all(promiseArray);
  const { data } = await axios.get('https://neat-shell-349400.uc.r.appspot.com/cart');
  dispatch(fetch_Cart(data));
};

export const dropCart = () => async (dispatch: Dispatch) => {
  try {
    dispatch(drop_Cart());
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = (params: CartItem) => async (dispatch: Dispatch) => {
  try {
    if (params.userId) {
      await axios.post('https://neat-shell-349400.uc.r.appspot.com/cart', params);
    }
    const { data }: any = await axios.get(`https://neat-shell-349400.uc.r.appspot.com/productById?productId=${params.productId}`);
    const temp: CartItem = { ...{ Product: data }, ...params };
    dispatch(add_To_Cart(temp));
  } catch (error) {
    console.error(error);
  }
};

export const adjustCartItem = (params: CartItem) => async (dispatch: Dispatch) => {
  try {
    if (params.userId) {
      await axios.post('https://neat-shell-349400.uc.r.appspot.com/adjustCartItem', params);
    }
    dispatch(adjust_Cart_Item(params));
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartItem = (params: CartItem) => async (dispatch: Dispatch) => {
  try {
    if (params.userId) {
      await axios.post('https://neat-shell-349400.uc.r.appspot.com/deleteCartItem', params);
    }
    dispatch(remove_Cart_Item(params));
  } catch (error) {
    console.error(error);
  }
};

//PRODUCT
export const fetchProducts = (params: string) => async (dispatch: Dispatch) => {
  try {
    let { data }: { data: Product[] } = await axios.get(`https://neat-shell-349400.uc.r.appspot.com/product?category=${params}`);
    dispatch(fetch_Products(data));
  } catch (error) {
    console.error(error);
  }
};

//ORDERS
export const createOrder = (currCart: CartItem[]) => async (dispatch: Dispatch) => {
  let promiseArray: any[] = [];
  try {
    if (currCart) {
      const { data } = await axios.post('https://neat-shell-349400.uc.r.appspot.com/order');
      currCart.forEach(async (product: CartItem) => {
        let params = { orderId: data.orderId, ...product, price: product.Product.price };
        promiseArray.push(axios.post('https://neat-shell-349400.uc.r.appspot.com/orderedProducts', params));
        promiseArray.push(axios.post('https://neat-shell-349400.uc.r.appspot.com/productUpdate', params));
      });
    }
    await axios.delete('https://neat-shell-349400.uc.r.appspot.com/wipeCart');
    await Promise.all(promiseArray);
    dispatch(update_Product(currCart));
    dispatch(drop_Cart());
  } catch (error) {
    console.error(error);
  }
};

//DETAILS
export const fetchDetail = (name: string) => async (dispatch: Dispatch) => {
  try {
    let { data } = await axios.get(`https://neat-shell-349400.uc.r.appspot.com/productByName?name=${name}`);
    dispatch(fetch_Detail(data));
  } catch (error) {
    console.error(error);
  }
};

export const dropDetail = () => async (dispatch: Dispatch) => {
  try {
    dispatch(drop_Detail());
  } catch (error) {
    console.error(error);
  }
};
