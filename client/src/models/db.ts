export interface User {
  userId: number;
  name: string;
  password: string;
  email: string;
  photoUrl?: string;
}

export interface Product {
  productId: number;
  name: string;
  price: number;
  photoUrl: string;
  totalPurchased: number;
  category: string;
  description: string;
}

export interface ProductInCart {
  productInCartId: number;
  quantity: number;
  updatedAt: Date;
  userId: number;
  productId: number;
}

export interface OrderedProduct {
  orderedProductId: number;
  quantity: number;
  orderId: number;
  productId: number;
}

export interface Order {
  orderId: number;
  createdAt: Date;
  userId: number;
}
