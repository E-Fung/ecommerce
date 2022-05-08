import React from 'react';
import { OrderedProducts, Order } from '../models/redux';
import OrderedProductCard from './OrderedProductCard';

type Props = { order: Order };

const OrderCard: React.FC<Props> = ({ order }) => {
  const totalCost = (): number => {
    return order.OrderedProducts.reduce(function (total: number, product: OrderedProducts) {
      return total + product.price * product.quantity;
    }, 0);
  };

  return (
    <div className='bg-white rounded-lg border-2 w-full px-4 pt-4 pb-2 font-medium'>
      <div className='flex justify-between px-2'>
        <div>#{order.orderId}</div>
        <div className="underline">{order.createdAt.substring(0, 10)}</div>
      </div>
      <div className='space-y-2'>
        {order.OrderedProducts.map((orderedProduct) => (
          <OrderedProductCard key={orderedProduct.orderedProductId} productDetail={orderedProduct} />
          ))}
      </div>
      <div className="text-right px-2">Total: ${totalCost().toFixed(2)}</div>
    </div>
  );
};

export default OrderCard;
