export interface State {
  user: User;
  cart: CartItem[];
  products: Product[];
}

//Cart
export interface CartItem {
  quantity: number;
  productId: number;
  userId?: number;
  Product: Product;
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
  isFetching?: boolean;
}
export interface UserAction {
  type: string;
  user?: User;
  isFetching?: boolean;
}

// Product
export interface Product {
  productId: number;
  name: string;
  price: number;
  photoUrl: string;
  totalPurchased: number;
  category: string;
  description: string;
}

export interface ProductsAction {
  type: string;
  products?: Product[];
  currCart?: CartItem[];
}
