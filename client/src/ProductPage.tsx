import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { State, Product } from './models/redux';
import { fetchDetail } from './redux/utils/thunkCreators';

type Props = { fetchDetail: any; detail: Product | null };

const ProductPage: React.FC<Props> = ({ fetchDetail, detail }) => {
  const { productName } = useParams();

  const getItem = useCallback(async () => {
    await fetchDetail(productName!);
  }, []);

  useEffect(() => {
    getItem();
  }, []);

  if (!detail) {
    return <></>;
  }

  return (
    <div className='flex grow bg-secondaryDeep flex-col justify-center'>
      {/* <div className='z-30 fixed bg-secondaryDeep top-0 w-60 text-black mx-auto left-0 right-0 h-20'>asd</div> */}
      <div className='w-full bg-white flex rounded-t-3xl flex-col grow h-full'>
        <div className='flex justify-center z-20'>
          <div className='-translate-y-6 w-full h-60 w-60 p-2 flex items-center justify-center shadow-xl rounded-3xl bg-white'>
            <img src={detail.photoUrl} alt='' className='max-h-full max-w-full' />
          </div>
        </div>
        <div className='space-y-3 pb-4'>
          <div className='text-black text-2xl font-bold px-6 text-center'>{detail.name}</div>
          <div className='text-gray-400 px-8'>{detail.description}</div>
        </div>
      </div>

      {/* <div
          id='addCartNavbar'
          style={{ paddingBottom: `${navbarHeight?.clientHeight}px` }}
          className='bg-primary absolute bottom-0 rounded-t-3xl w-full px-8 pt-4'
        >
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
        </div> */}

      {/* <div className='flex h-96 w-1/3 bg-white items-center justify-center border-2 rounded'>
        <img src={detail.photoUrl} alt='' className='max-h-full max-w-full' />
      </div>
      <div className='flex flex-col w-2/3 p-10 space-y-5'>
        <div className='text-2xl font-bold'>{detail.name}</div>
        <div>Total Purchased: {detail.totalPurchased}</div>
        <div>${detail.price.toFixed(2)}</div>
        <div className='text-gray-400 '>{detail.description}</div>
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
            </button>p
          </div>
        </form>
      </div> */}
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
    fetchDetail: (name: string) => {
      dispatch(fetchDetail(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
