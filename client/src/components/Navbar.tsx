import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { User, State, CartItem } from '../models/redux';
import { logout } from '../redux/utils/thunkCreators';
import { logo, emptyUser } from '../assets';
//mx-auto - centers container
//max-w-7xl - constrains the container

//relative makes it so that the sub component's css is relative to this container
type Props = { user: User; logout: any; cart: CartItem[] };

const Navbar: React.FC<Props> = ({ user, logout, cart }) => {
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const [shopMenu, setShopMenu] = useState<boolean>(false);
  const [regLogMenu, setRegLogMenu] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const menuItems = useMemo(() => {
    return [
      ['men', "Men's Clothing"],
      ['women', "Women's Clothing"],
      ['jewelery', 'Jewelery'],
      ['electronics', 'Electronics'],
    ];
  }, []);
  const toggleRegLogMenu = () => {
    setRegLogMenu(!regLogMenu);
  };
  const toggleUserMenu = () => {
    setUserMenu(!userMenu);
  };
  const toggleShopMenu = () => {
    setShopMenu(!shopMenu);
  };
  const handleLogout = async (event: any) => {
    toggleUserMenu();
    event.preventDefault();
    await logout();
  };

  const sum = cart.reduce((partialSum, currentValue) => partialSum + currentValue.quantity, 0);

  return (
    <nav className='bg-light sticky top-0'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* {hidden menu button on small screen} */}
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={toggleShopMenu}
            >
              <span className='sr-only'>Open main menu</span>
              <svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={`${!shopMenu ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'}`} />
              </svg>
            </button>
          </div>
          <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            {/* Logo, and menu items */}
            <Link to={'/product'}>
              <div className='flex-shrink-0 flex items-center'>
                {/* <img className='block lg:hidden h-16 w-auto' src={logo} alt='' />
                <img className='hidden lg:block h-16 w-auto' src={logo} alt='' /> */}
                <img src={logo} alt='' />
              </div>
            </Link>
            <div className='hidden items-center sm:flex sm:ml-6'>
              <div className='flex space-x-4'>
                {menuItems.map(([link, title]) => (
                  <Link to={`/product?category=${link}`} key={title}>
                    <div
                      key={title}
                      className={`text-white hover:bg-light px-3 py-2 rounded-md text-sm font-medium ${
                        searchParams.get('category') === link ? 'bg-highlight' : ''
                      }`}
                    >
                      {title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            {/* Cart Register/Login button */}
            {'Hello ' + user.name}
            <Link to={'/cart'}>
              <button
                type='button'
                className='bg-light p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
              >
                {/* Cart */}
                <div className='flex space-x-2 px-2'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  <div>{sum > 10 ? '10+' : sum}</div>
                </div>
              </button>
            </Link>
            <div className='ml-3 relative'>
              <div>
                {user.email && (
                  <button
                    type='button'
                    className='bg-white flex justify-center content-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white overflow-clip'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={toggleUserMenu}
                  >
                    <span className='sr-only'>Open user menu</span>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10' fill='none' viewBox='0 0 24 24' stroke='black' strokeWidth={2}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                  </button>
                )}
                {!user.email && <img className='cursor-pointer' onClick={toggleRegLogMenu} src={emptyUser} alt='' />}
                {regLogMenu && (
                  <div
                    className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    tabIndex={-1}
                  >
                    <Link to='/register'>
                      <div
                        onClick={toggleRegLogMenu}
                        className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-orange-500 hover:underline'
                        role='menuitem'
                        tabIndex={-1}
                        id={`user-menu-item-0`}
                        key={'Your Profile'}
                      >
                        Register
                      </div>
                    </Link>
                    <Link to='/login'>
                      <div
                        onClick={toggleRegLogMenu}
                        className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-orange-500 hover:underline'
                        role='menuitem'
                        tabIndex={-1}
                        id={`user-menu-item-1`}
                        key={'Sign out'}
                      >
                        Login
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              {userMenu && (
                <div
                  className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu-button'
                  tabIndex={-1}
                >
                  <Link to='/profile'>
                    <div
                      onClick={toggleUserMenu}
                      className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-orange-500 hover:underline'
                      role='menuitem'
                      tabIndex={-1}
                      id={`user-menu-item-0`}
                      key={'Your Profile'}
                    >
                      {'Your Profile'}
                    </div>
                  </Link>
                  <div
                    onClick={handleLogout}
                    className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-orange-500 hover:underline'
                    role='menuitem'
                    tabIndex={-1}
                    id={`user-menu-item-1`}
                    key={'Sign out'}
                  >
                    {'Sign out'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {shopMenu && (
        // user menu (when logged in)
        <div className='sm:hidden' id='mobile-menu'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {menuItems.map(([link, title]) => (
              <Link to={`/product?category=${link}`} key={title}>
                <div
                  key={title}
                  onClick={toggleShopMenu}
                  className={`text-gray-300 hover:bg-light block px-3 py-2 rounded-md text-base font-medium ${
                    searchParams.get('category') === link ? 'bg-highlight' : ''
                  }`}
                >
                  {title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
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
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
