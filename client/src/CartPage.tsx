import React from 'react';
import { connect } from 'react-redux';
import { CartItem, State } from './models/redux';
import CartCard from './components/CartCard';

type Props = { cart: CartItem[] };

const CartPage: React.FC<Props> = ({ cart }) => {
  const getTotalItems = (): string => {
    let totalQuantity: number = cart!.reduce(function (total: number, product: CartItem, index) {
      return total + product.quantity;
    }, 0);
    return `Subtotal (${totalQuantity} item${totalQuantity === 1 ? '' : 's'}):`;
  };

  const getTotalCost = (): string => {
    return cart!
      .reduce(function (total: number, product: CartItem, index) {
        return total + product.Product.price * product.quantity;
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

  return (
    <div className='justify-center flex flex-wrap space-y-2 max-w-7xl mx-auto p-4 sm:px-6 lg:px-8'>
      <div className='bg-white w-full space-y-4'>
        <div className='text-black text-xl pl-4 pt-4 font-semibold'>Shopping Cart</div>
        {cart.map((product: CartItem, index: number) => (
          <div key={product.productId}>
            <CartCard product={product.Product} quantity={product.quantity} key={product.productId} />
          </div>
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
