import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchCart, dropDetail } from './redux/utils/thunkCreators';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
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

type Props = { user: User; fetchUser: any; fetchCart: any; dropDetail: any };

const AppRoutes: React.FC<Props> = ({ user, fetchUser, fetchCart, dropDetail }) => {
  const location = useLocation();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!location.pathname.includes('/product/')) {
      dropDetail();
    }
  }, [location]);

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
    return (
      <>
        <Topbar />
        <Outlet />
      </>
    );
  };

  return (
    <div className='min-h-screen min-w-screen flex flex-col'>
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
    dropDetail() {
      dispatch(dropDetail());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
