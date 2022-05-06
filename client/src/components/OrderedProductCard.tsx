import React from 'react';
import { OrderedProducts } from '../models/redux';
import { Link } from 'react-router-dom';

type Props = { productDetail: OrderedProducts };

const OrderedProductCard: React.FC<Props> = ({ productDetail }) => {
  return (
    <div className='flex border-2 rounded-lg p-2 justify-between'>
      <div className='flex'>
        <Link to={`/product/${productDetail.Product.name}`}>
          <div className='h-20 w-20 flex items-center justify-center content-center'>
            <img className='max-h-full max-w-full' src={productDetail.Product.photoUrl} alt='' />
          </div>
        </Link>
        <div className='flex flex-col'>
          {/* <div className=''>{productDetail.Product.name}</div> */}
          {/* <div>${productDetail.price.toFixed(2)}</div> */}
        </div>
      </div>
      <div className='flex space-x-2'>
        <div>{`$${productDetail.price.toFixed(2)} x Qty(${productDetail.quantity}):`}</div>
        <div>${(productDetail.quantity * productDetail.price).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default OrderedProductCard;
