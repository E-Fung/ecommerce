import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../models/redux';

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/product/${product.name}`} className='bg-white rounded my-1/2 m-1 p-3 w-1/2 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/4 xl:w-1/5'>
      <div className='space-y-1 text-black font-normal'>
        <div className='w-full h-48 flex items-center justify-center border-2 rounded'>
          <img src={product.photoUrl} alt='' className='max-h-full max-w-full' />
        </div>
        <div>{product.name}</div>
        <div className='text-xs flex justify-center'>Total Purchased: {product.totalPurchased}</div>
        <div className='flex'>
          <div className='text-xs flex justify-center leading-3'>$</div>
          <div className='text-lg flex justify-center leading-4'>{product.price.toFixed(0)}</div>
          <div className='text-xs leading-3'> {product.price.toFixed(2).slice(-2)}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
