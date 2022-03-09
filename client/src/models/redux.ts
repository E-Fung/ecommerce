export interface CartItem {
  quantity: number;
  ProductId: number;
  UserId?: number;
}

export interface CartPayload {
  payload: null | CartItem;
  type: string;
}

// export enum CartAction {
//   GET_CART = 'GET_CART',
//   ADD_TO_CART = 'ADD_TO_CART',
//   ADJUST_CART = 'ADJUST_CART',
//   DROP_CART = 'DROP_CART',
// }
