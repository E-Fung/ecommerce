import React from 'react';
import { OrderedProducts } from '../models/redux';
import { Link } from 'react-router-dom';

type Props = { productDetail: OrderedProducts };

const OrderedProductCard: React.FC<Props> = ({ productDetail }) => {
  return (
    <div className='flex border-2 rounded-lg p-2 justify-between bg-white space-x-1'>
      <div className='flex'>
        <Link to={`/product/${productDetail.Product.name}`} className="flex items-center">
          <div className='h-20 w-20 flex items-center justify-center content-center'>
            <img className='max-h-full max-w-full' src={productDetail.Product.photoUrl} alt='' />
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-between grow">
        <div>
          <div className="text-md font-semibold">{productDetail.Product.name}</div>
          <div className="text-gray-500 text-xs">{`$${productDetail.price}/unit`}</div>
          <div className="text-gray-500 text-xs">{`Qty: ${productDetail.quantity}`}</div>
        </div>
        <div className="flex justify-end font-semibold">
          <div>${(productDetail.quantity * productDetail.price).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderedProductCard;
