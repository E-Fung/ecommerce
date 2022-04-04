import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { State, User, Product, CartItem } from './models/redux';
import { getProductsByName } from './services/services';
import { addToCart } from './redux/utils/thunkCreators';

type Props = { user: User; addToCart: any };

const ProductPage: React.FC<Props> = ({ user, addToCart }) => {
  const { productName } = useParams();
  const [details, setDetails] = useState<Product>();

  const getItem = useCallback(async () => {
    const data = await getProductsByName(productName!);
    setDetails(data);
  }, [productName]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  const handleAddToCart = async (event: any) => {
    event.preventDefault();
    const quantity: number = Number(event.target.quantity.value);
    const productId: number = details!.productId;
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

  if (!details) {
    return <></>;
  }

  return (
    <div className='flex max-w-7xl mx-auto mt-10 px-2 sm:flex-nowrap sm:px-6 lg:px-8'>
      <div className='flex h-96 w-1/3 bg-white items-center justify-center border-2 rounded'>
        <img src={details.photoUrl} alt='' className='max-h-full max-w-full' />
      </div>
      <div className='flex flex-col w-2/3 p-10 space-y-5'>
        <div className='text-2xl font-bold'>{details.name}</div>
        <div>Total Purchased: {details.totalPurchased}</div>
        <div>${details.price.toFixed(2)}</div>
        <div className='text-gray-400 '>{details.description}</div>
        <form onSubmit={handleAddToCart} className='space-y-5'>
          <div className='flex items-center space-x-2'>
            <label htmlFor='quantity'>Quantity: </label>
            <select id='quantity' name='quantity' className='text-black rounded-sm'>
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
              className='text-white bg-highlight hover:bg-highlight focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            >
              Add to Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToCart: (params: CartItem) => {
      dispatch(addToCart(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
