import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchCart } from './redux/utils/thunkCreators';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { User, State, CartItem } from '../src/models/redux';
import Register from './Register';
import Navbar from './components/Navbar';
import Topbar from './components/Topbar';
import ProductContainer from './ProductsContainer';
import ErrorPage from './ErrorPage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import OrderPage from './OrderPage';

type Props = { user: User; fetchUser: any; fetchCart: any };

const AppRoutes: React.FC<Props> = ({ user, fetchUser, fetchCart }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user.email) {
      (async () => {
        await fetchCart();
      })();
    }
  }, [user]);

  const WithNav = () => {
    return (
      <>
        <Topbar />
        <Outlet />
        <Navbar />
      </>
    );
  };

  const WithoutNav = () => {
    return <Outlet />;
  };

  return (
    <div className='min-h-screen min-w-screen'>
      <Routes>
        <Route element={<WithNav />}>
          <Route path='/' element={<Navigate to={'/product'} replace />} />
          <Route path='/product' element={<ProductContainer />} />
          <Route path='/product/:productName' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/orders' element={<OrderPage />} />
        </Route>
        <Route element={<WithoutNav />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUser() {
      dispatch(fetchUser());
    },
    fetchCart(currCart: CartItem[]) {
      dispatch(fetchCart(currCart));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
