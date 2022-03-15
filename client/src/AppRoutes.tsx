import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './redux/utils/thunkCreators';
import { Routes, Route, Outlet } from 'react-router-dom';
import Register from './Register';
import { User, State } from '../src/models/redux';
import Navbar from './components/Navbar';

type Props = { user: User; fetchUser: any };

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

const AppRoutes: React.FC<Props> = ({ user, fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (user.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route element={<WithNav />}>
          <Route path='/' element={<>asd</>} />
        </Route>
        <Route element={<WithoutNav />}>
          <Route path='/register' element={<Register />} />
        </Route>
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
