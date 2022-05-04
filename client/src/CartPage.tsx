import React from 'react';
import { connect } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { CartItem, State, User } from './models/redux';
import { createOrder } from './redux/utils/thunkCreators';
import CartCard from './components/CartCard';

type Props = { cart: CartItem[]; user: User; createOrder: any };

const CartPage: React.FC<Props> = ({ cart, user, createOrder }) => {
  // const navigate = useNavigate();

  // const getTotalItems = (): string => {
  //   let totalQuantity: number = cart!.reduce(function (total: number, product: CartItem, index) {
  //     return total + product.quantity;
  //   }, 0);
  //   return `Total (${totalQuantity} item${totalQuantity === 1 ? '' : 's'}):`;
  // };

  // const getTotalCost = (): string => {
  //   return cart!
  //     .reduce(function (total: number, product: CartItem, index) {
  //       return total + product.Product.price * product.quantity;
  //     }, 0)
  //     .toFixed(2);
  // };

  // const handleCheckout = async () => {
  //   await createOrder(cart);
  //   navigate('/product');
  // };

  if (!cart.length) {
    return (
      <div className='w-full h-full grow flex justify-center table'>
        <div className='text-5xl text-black text-center table-cell align-middle'>Your cart is empty</div>
      </div>
    );
  }

  return (
    <div className='justify-center flex flex-wrap grow text-black p-4'>
      <div className='space-y-4 w-full'>
        {cart.map((product: CartItem, index: number) => (
          <div key={product.productId}>
            <CartCard product={product.Product} quantity={product.quantity} key={product.productId} />
          </div>
        ))}
        {/* <div className='flex bg-white justify-end p-4 space-x-2 border-4 text-black rounded-lg'>
          <div className='font-semibold'>{getTotalItems()} </div>
          <div className='font-bold border-2'>${getTotalCost()}</div>
        </div> */}
      </div>
      {/* <div className='bg-dark w-full space-y-4'>
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
                <button
                  onClick={handleCheckout}
                  disabled={user.email ? false : true}
                  className='bg-highlight text-white rounded-lg px-2 py-1 disabled:bg-black'
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    cart: state.cart,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createOrder: (currCart: CartItem[]) => {
      dispatch(createOrder(currCart));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
