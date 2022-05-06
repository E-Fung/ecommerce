import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../models/redux';

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/product/${product.name}`} className='w-1/2 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/4 xl:w-1/5'>
      <div className='m-1 bg-white rounded p-3 shadow-md relative'>
        <div className='flex absolute top-0 right-0 p-1'>
          <div className='bg-primaryDeep p-2 rounded-full'>
            <svg width='15' height='15' viewBox='0 0 21 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.3355 3.60758L8.91653 2.13605C7.94103 1.12442 6.61797 0.556091 5.2384 0.556091C2.3656 0.556091 0.0367432 2.97121 0.0367432 5.9504C0.0367432 7.38107 0.584772 8.75313 1.56027 9.76476L10.3355 18.865L13.7684 15.3049L19.1107 9.76476C20.0862 8.75313 20.6343 7.38106 20.6343 5.9504C20.6343 2.97121 18.3054 0.556091 15.4326 0.556091C14.053 0.556091 12.73 1.12442 11.7545 2.13605L10.3355 3.60758Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
        <div className='space-y-1 text-black font-normal'>
          <div className='w-full h-32 p-2 lg:h-48 flex items-center justify-center border-2 rounded'>
            <img src={product.photoUrl} alt='' className='max-h-full max-w-full' />
          </div>

          <div className='truncate text-xs'>{product.name}</div>
          {/* <div className='text-xs flex justify-center'>Total Purchased: {product.totalPurchased}</div> */}
          <div className='flex font-semibold'>
            <div className='text-xs flex justify-center leading-3'>$</div>
            <div className='text-lg flex justify-center leading-4'>{product.price.toFixed(0)}</div>
            <div className='text-xs leading-3'> {product.price.toFixed(2).slice(-2)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
