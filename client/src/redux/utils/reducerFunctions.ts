import { CartItem } from '../../models/redux';

//Cart
export const addItemToCart = (state: CartItem[], payload: null | CartItem) => {
  const cartCopy: CartItem[] = [...state];
  let itemExist: boolean = false;

  cartCopy.map((item) => {
    if (item.ProductId === payload!.ProductId) {
      const itemCopy = { ...item };
      itemCopy.quantity = itemCopy.quantity + payload!.quantity;
      itemExist = true;
      return itemCopy;
    }
    return item;
  });

  if (!itemExist) cartCopy.push(payload!);
  return cartCopy;
};

export const adjustCart = (state: CartItem[], payload: null | CartItem) => {
  return state.map((item) => {
    if (item.ProductId === payload!.ProductId) {
      const itemCopy = { ...item };
      itemCopy.quantity += payload!.quantity;
      return itemCopy;
    } else {
      return item;
    }
  });
};
