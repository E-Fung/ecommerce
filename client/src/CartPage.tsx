import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CartItem, State, Product } from './models/redux';
import CartCard from './components/CartCard';
import { getProductsById } from './services/services';

type Props = { cart: CartItem[] };

const CartPage: React.FC<Props> = ({ cart }) => {
  const [cartProducts, setCartProducts] = useState<Product[]>();

  useEffect(() => {
    loadProducts();
  }, [cart]);

  const loadProducts = async (): Promise<void> => {
    const tempArray = await getProductsById(cart);
    const tempDetails: Product[] = tempArray.map((productData) => {
      return productData.data;
    });
    setCartProducts(tempDetails);
  };

  const getTotalItems = (): string => {
    let totalQuantity: number = cartProducts!.reduce(function (total: number, product: Product, index) {
      return total + cart[index].quantity;
    }, 0);
    return `Subtotal (${totalQuantity} item${totalQuantity === 1 ? '' : 's'}):`;
  };

  const getTotalCost = (): string => {
    return cartProducts!
      .reduce(function (total: number, product: Product, index) {
        return total + product.price * cart[index].quantity;
      }, 0)
      .toFixed(2);
  };

  if (!cart.length) {
    return (
      <div className='w-full h-full py-80 flex justify-center'>
        <div className='text-5xl'>Your cart is empty</div>
      </div>
    );
  }

  if (!cartProducts) {
    return <></>;
  }

  return (
    <div className='justify-center flex flex-wrap space-y-2 max-w-7xl mx-auto p-4 sm:px-6 lg:px-8'>
      <div className='bg-white w-full space-y-4'>
        <div className='text-black text-xl pl-4 pt-4 font-semibold'>Shopping Cart</div>
        {cartProducts.map((product: Product, index: number) => (
          <CartCard product={product} quantity={cart[index].quantity} key={product.productId} />
        ))}
        <div className='flex justify-end p-4 space-x-2 border-4 text-black'>
          <div className='font-semibold'>{getTotalItems()} </div>
          <div className='font-bold border-2'>${getTotalCost()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(CartPage);
