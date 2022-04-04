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
    return `Total (${totalQuantity} item${totalQuantity === 1 ? '' : 's'}):`;
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
    <div className='justify-center flex flex-wrap max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 text-black'>
      <div className='bg-dark w-full space-y-4'>
        <div className='text-black bg-white text-xl pl-4 pt-4 font-semibold border-4 rounded-lg'>Shopping Cart</div>
        <div className='flex'>
          <div className='w-9/12 space-y-4'>
            {cart.map((product: CartItem, index: number) => (
              <div key={product.productId}>
                <CartCard product={product.Product} quantity={product.quantity} key={product.productId} />
              </div>
            ))}
            <div className='flex bg-white justify-end p-4 space-x-2 border-4 text-black rounded-lg'>
              <div className='font-semibold'>{getTotalItems()} </div>
              <div className='font-bold border-2'>${getTotalCost()}</div>
            </div>
          </div>
          <div className='bg-dark w-3/12 ml-4 text-black'>
            <div className='bg-white border-4 rounded-lg py-4 space-y-4'>
              <div className='flex justify-center space-x-2'>
                <div className='font-semibold'>{getTotalItems()} </div>
                <div className='font-bold'>${getTotalCost()}</div>
              </div>
              <div className='flex justify-center'>
                <button className='bg-highlight text-white rounded-lg px-2 py-1'>Checkout</button>
              </div>
            </div>
          </div>
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
