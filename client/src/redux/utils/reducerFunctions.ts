import { CartItem } from '../../models/redux';

//Cart
export const addItemToCart = (state: CartItem[], payload: CartItem) => {
  const i = state.findIndex((element) => element.productId === payload!.productId);
  if (i > -1) {
    return state.map((item: CartItem, index) => {
      console.log(i, index);
      if (index === i) {
        const itemCopy = { ...item };
        console.log(itemCopy.quantity, payload.quantity);
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

// export const integrateCart = (state: CartItem[], payload: null | CartItem[]) => {
//   const cartCopy: CartItem[] = [...state];

//   cartCopy.map((item) => {
//     if (item.ProductId === payload!.ProductId) {
//       const itemCopy = { ...item };
//       itemCopy.quantity = itemCopy.quantity + payload!.quantity;
//       itemExist = true;
//       return itemCopy;
//     }
//     return item;
//   });

//   if (!itemExist) cartCopy.push(payload!);
//   return cartCopy;
// };

export const adjustCart = (state: CartItem[], payload: null | CartItem) => {
  return state.map((item) => {
    if (item.productId === payload!.productId) {
      const itemCopy = { ...item };
      itemCopy.quantity += payload!.quantity;
      return itemCopy;
    } else {
      return item;
    }
  });
};
