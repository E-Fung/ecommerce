import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { State, User, Product, CartItem } from './models/redux';
import { getProductsByName } from './services/services';
import { addCart } from './redux/utils/thunkCreators';

type Props = { user: User; addCart: any };

const ProductPage: React.FC<Props> = ({ user, addCart }) => {
  const { productName } = useParams();
  const [details, setDetails] = useState<Product>();

  const getItem = async () => {
    const data = await getProductsByName(productName!);
    setDetails(data);
  };

  useEffect(() => {
    getItem();
  }, []);

  const handleAddToCart = async (event: any) => {
    event.preventDefault();
    const quantity: number = Number(event.target.quantity.value);
    const productId: number = details!.productId;
    if (user.userId) {
      const userId = user.userId;
      await addCart({ quantity, userId, productId });
    } else {
      await addCart({ quantity, productId });
    }
  };

  const dropdownRange = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => i + 1);
  }, []);

  if (!details) {
    return <></>;
  }

  return (
    <div className='flex flex-wrap max-w-7xl mx-auto mt-10 px-2 sm:flex-nowrap sm:px-6 lg:px-8'>
      <div className='p-10'>
        <img src={details.photoUrl} alt='' />
      </div>
      <div className='p-10 space-y-5'>
        <div>{details.name}</div>
        <div>Total Purchased: {details.totalPurchased}</div>
        <div>${details.price}</div>
        <div>{details.description}</div>
        <form onSubmit={handleAddToCart} className='space-y-5'>
          <div>
            <label htmlFor='quantity'>Quantity: </label>
            <select id='quantity' name='quantity' className='text-black'>
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
              className='text-black bg-highlight hover:bg-highlight focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
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
    addCart: (params: CartItem) => {
      dispatch(addCart(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
