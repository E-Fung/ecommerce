export interface CartItem {
  quantity: number;
  ProductId: number;
  userId?: number;
}

export interface CartAction {
  type: string;
  cart?: CartItem[];
  cartItem?: CartItem;
}

//  User
export interface User {
  userId: number;
  name: string;
  password: string;
  email: string;
  photoUrl?: string;
}
export interface UserAction {
  type: string;
  user?: User;
  isFetching?: boolean;
}

export interface UserState {
  user?: User;
  isFetching?: boolean;
}
