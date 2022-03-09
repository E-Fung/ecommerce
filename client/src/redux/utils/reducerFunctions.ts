import { CartItem } from '../../models/redux';

//Cart
export const addItemToCart = (state: CartItem[], payload: null | CartItem) => {
  const cartCopy: CartItem[] = [...state];
  let itemExist: boolean = false;

  cartCopy.map((cartItem) => {
    if (cartItem.ProductId === payload!.ProductId) {
      cartItem.quantity = cartItem.quantity + payload!.quantity;
      itemExist = true;
    }
  });

  if (!itemExist) cartCopy.push(payload!);
  return cartCopy;
};

export const adjustCart = (state: CartItem[], payload: null | CartItem) => {
  return state.map((item) => {
    if (item.ProductId === payload!.ProductId) {
      item.quantity += payload!.quantity;
    }
  });
};
