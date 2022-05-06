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
    <div className='bg-white rounded-lg border-2 w-full p-4'>
      <div className='flex justify-between'>
        <div>Order#{order.orderId}</div>
        <div>Total: ${totalCost().toFixed(2)}</div>
        <div>Order Placed {order.createdAt.substring(0, 10)}</div>
      </div>
      <div className='space-y-2'>
        {order.OrderedProducts.map((orderedProduct) => (
          <OrderedProductCard key={orderedProduct.orderedProductId} productDetail={orderedProduct} />
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
