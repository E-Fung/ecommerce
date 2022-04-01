import axios from 'axios';
import { CartItem } from '../models/redux';

export const getProductsByName = async (name: string) => {
  let { data } = await axios.get(`http://localhost:5000/productByName?name=${name}`).then((resp) => resp);
  return data;
};

export const getProductsById = async (cart: CartItem[]) => {
  let promiseArray: any[] = [];
  cart.forEach(async (cartItem) => {
    promiseArray.push(axios.get(`http://localhost:5000/productById?productId=${cartItem.productId}`));
  });
  return Promise.all(promiseArray);
};
