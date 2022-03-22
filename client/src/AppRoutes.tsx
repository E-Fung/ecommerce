import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './redux/utils/thunkCreators';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { User, State } from '../src/models/redux';
import Register from './Register';
import Navbar from './components/Navbar';
import ProductContainer from './ProductsContainer';
import ErrorPage from './ErrorPage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import LoginPage from './LoginPage';

type Props = { user: User; fetchUser: any };

const AppRoutes: React.FC<Props> = ({ user, fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const WithNav = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };

  const WithoutNav = () => {
    return <Outlet />;
  };

  return (
    <>
      <Routes>
        <Route element={<WithNav />}>
          <Route path='/' element={<Navigate to={'/product'} replace />} />
          <Route path='/product' element={<ProductContainer />} />
          <Route path='/product/:productName' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Route>
        <Route element={<WithoutNav />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
