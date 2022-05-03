import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { State, User, Product, CartItem } from '../../models/redux';
import { addToCart } from '../../redux/utils/thunkCreators';

type Props = { user: User; addToCart: any; detail: Product };

const CartNavbar: React.FC<Props> = ({ user, addToCart, detail }) => {
  const navbarHeight = document.getElementById('navbar');

  const handleAddToCart = async (event: any) => {
    event.preventDefault();
    const quantity: number = Number(event.target.quantity.value);
    const productId: number = detail!.productId;
    if (user.userId) {
      const userId = user.userId;
      await addToCart({ quantity, userId, productId });
    } else {
      await addToCart({ quantity, productId });
    }
  };

  const dropdownRange = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => i + 1);
  }, []);

  if (!detail) {
    return <></>;
  }

  return (
    <div id='addCartNavbar' className='bg-primary absolute bottom-0 rounded-t-3xl w-full px-8 pt-4'>
      <form onSubmit={handleAddToCart} className='flex justify-between align-center mb-4'>
        <div className='text-white'>
          <div className='text-gray-300 text-sm'>Price</div>
          <div className='text-md font-semibold'>${detail.price.toFixed(2)}</div>
        </div>
        <div className='flex items-center space-x-2'>
          <select id='quantity' name='quantity' className='text-black rounded-lg'>
            {dropdownRange.map((number) => (
              <option value={number} key={number} className='text-black'>
                {number}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type='submit'
            className='text-white bg-primaryDeep hover:bg-highlight focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center '
          >
            Add to Cart
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
    detail: state.detail,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToCart: (params: CartItem) => {
      dispatch(addToCart(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartNavbar);
