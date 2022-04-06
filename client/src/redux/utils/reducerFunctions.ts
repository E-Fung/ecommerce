import { CartItem, Product } from '../../models/redux';

//Product
export const updateProduct = (state: Product[], payload: CartItem[]) => {
  return state.map((product: Product, index) => {
    let found = payload.find((item) => item.productId === product.productId);
    if (found) {
      const productCopy = { ...product };
      productCopy.totalPurchased += found.quantity;
      return productCopy;
    }
    return product;
  });
};

//Cart
export const addItemToCart = (state: CartItem[], payload: CartItem) => {
  const i = state.findIndex((element) => element.productId === payload!.productId);
  if (i > -1) {
    return state.map((item: CartItem, index) => {
      if (index === i) {
        const itemCopy = { ...item };
        itemCopy.quantity += payload.quantity;
        return itemCopy;
      }
      return item;
    });
  }

  let cartCopy: CartItem[] = [...state];
  cartCopy.push(payload!);
  return cartCopy;
};

export const deleteItemFromCart = (state: CartItem[], payload: null | CartItem) => {
  return state.filter((item) => item.productId !== payload!.productId);
};

export const adjustCartItem = (state: CartItem[], payload: null | CartItem) => {
  return state.map((item) => {
    if (item.productId === payload!.productId) {
      const itemCopy = { ...item };
      itemCopy.quantity = payload!.quantity;
      return itemCopy;
    } else {
      return item;
    }
  });
};
