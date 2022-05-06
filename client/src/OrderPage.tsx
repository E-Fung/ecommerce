import React, { useEffect, useState } from 'react';
import { getOrdersById } from './services/services';
import { Order, User, State } from './models/redux';
import { connect } from 'react-redux';
import OrderCard from './components/OrderCard';

//I want the state to be an array that contains orders, the orders themselves are another array containing all the other data,
// the array is sorted by createdAt
type Props = { user: User };

const OrderPage: React.FC<Props> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (user.email) {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async (): Promise<void> => {
    setOrders(await getOrdersById());
  };

  if (!orders.length) {
    return (
      <div className='w-full h-full py-80 flex justify-center'>
        <div className='text-5xl'>No Orders</div>
      </div>
    );
  }

  return (
    <div className='justify-center flex flex-wrap p-4 text-black space-y-2'>
      {orders?.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(OrderPage);
