import React from 'react';
import { connect } from 'react-redux';
import { CartItem, State } from './models/redux';

type Props = { cart: CartItem[] };

const CartPage: React.FC<Props> = ({ cart }) => {
  return (
    <div className='justify-center flex flex-wrap max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
      {cart.map((product: CartItem) => (
        <p>{product.productId}</p>
      ))}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(CartPage);
