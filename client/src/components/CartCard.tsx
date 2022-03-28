import React, { useState, useEffect } from 'react';
import { Product } from '../models/redux';

type Props = { product: Product; quantity: number };

const CartCard: React.FC<Props> = ({ product, quantity }) => {
  return (
    <div className='flex text-black w-full p-4 border-4'>
      <div className='h-40 w-40 flex items-center justify-center content-center border-2'>
        <img className='max-h-full max-w-full' src={product?.photoUrl} alt='' />
      </div>
      <div className='flex w-full justify-between'>
        <div className='border-2 flex flex-col'>
          <div>{product?.name}</div>
          <div>{quantity}</div>
        </div>
        <div className='border-2 font-bold'>${(product?.price! * quantity).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CartCard;
