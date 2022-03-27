import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../models/redux';

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/product/${product.name}`} className='bg-white rounded h-100 my-1/2 m-1 p-3 w-1/2 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/4 xl:w-1/5'>
      <div className='flex flex-col h-full w-full space-y-1 text-black font-semibold'>
        <div className='w-full h-60 border-2 rounded flex justify-center'>
          <img src={product.photoUrl} alt='' className='max-h-full max-w-full' />
        </div>
        <div>{product.name}</div>
        <div>${product.price.toFixed(2)}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
