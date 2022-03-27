import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import { login, fetchCart } from './redux/utils/thunkCreators';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { User, State, CartItem } from './models/redux';
import { logo } from './assets';

type Props = { user: User; login: any; cart: CartItem[]; fetchCart: any };
const LoginPage: React.FC<Props> = (props) => {
  const { login, user, cart, fetchCart } = props;

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await login({ email, password });
  };

  useEffect(() => {
    (async () => {
      if (user.email && cart.length) {
        await fetchCart(cart);
      }
    })();
  }, [user]);

  const registItems = useMemo(() => {
    //type, Title, ID
    return [
      ['email', 'Email address', 'email-address'],
      ['password', 'Password', 'password'],
    ];
  }, []);

  if (user.email) {
    return <Navigate replace to='/product' />;
  }

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <Link to={'/product'}>
            <img className='mx-auto h-12 w-auto' src={logo} alt='' />
          </Link>
          <h2 className='mt-6 text-center text-3xl font-extrabold'>Login</h2>
        </div>
        <form className='mt-8 space-y-6' action='#' onSubmit={handleLogin}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            {registItems.map(([type, title, id]) => (
              <div key={title}>
                <label htmlFor={id} className='sr-only'>
                  {title}
                </label>
                <input
                  id={id}
                  name={type}
                  type={type}
                  // autoComplete={type}
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder={title}
                />
              </div>
            ))}
          </div>
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <LockClosedIcon className='h-5 w-5 text-white' aria-hidden='true' />
              </span>
              Login
            </button>
            <div className='flex p-8 underline justify-center'>
              <Link to={'/register'}>register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (credentials: { email: string; password: string }) => {
      dispatch(login(credentials));
    },
    fetchCart: (currCart: CartItem[]) => {
      dispatch(fetchCart(currCart));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
