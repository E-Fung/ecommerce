import React, { useState, useMemo, useRef } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { User, State, CartItem, Product } from '../models/redux';
import { logout } from '../redux/utils/thunkCreators';
import MenuDropModal from './subcomponents/MenuDropModal';
import OutsiderAlerter from './subcomponents/OutsiderAlerter';
//mx-auto - centers container
//max-w-7xl - constrains the container

//relative makes it so that the sub component's css is relative to this container
type Props = { user: User; logout: any; cart: CartItem[]; detail: Product };

const Topbar: React.FC<Props> = ({ user, logout, cart, detail }) => {
  const regLogRef: any = useRef();
  const shopRef: any = useRef();
  const menuRef: any = useRef();
  const location = useLocation();

  const [userMenu, setUserMenu] = useState<boolean>(false);
  const [shopMenu, setShopMenu] = useState<boolean>(false);
  const [regLogMenu, setRegLogMenu] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const menuItems = useMemo(() => {
    return [
      ['all', 'All'],
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
    navigate('/product');
  };

  const DropDownUserMenu = () => {
    return (
      <OutsiderAlerter onClickEvent={toggleUserMenu} theRef={menuRef}>
        <div
          className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30'
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
          <Link to='/orders'>
            <div
              onClick={toggleUserMenu}
              className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-orange-500 hover:underline'
              role='menuitem'
              tabIndex={-1}
              id={`user-menu-item-1`}
              key={'Past Orders'}
            >
              {'Past Orders'}
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-orange-500 hover:underline'
            role='menuitem'
            tabIndex={-1}
            id={`user-menu-item-2`}
            key={'Sign out'}
          >
            {'Sign out'}
          </div>
        </div>
      </OutsiderAlerter>
    );
  };

  const DropRegLogMenu = () => {
    return (
      <OutsiderAlerter onClickEvent={toggleRegLogMenu} theRef={regLogRef}>
        <div
          className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
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
      </OutsiderAlerter>
    );
  };

  const DropDownProductMenu = () => {
    return (
      <OutsiderAlerter onClickEvent={toggleShopMenu} theRef={shopRef}>
        <div className='sm:hidden' id='mobile-menu'>
          <div style={{ boxShadow: '0px 0px 1px 1px #C3C6C9' }} className='rounded-md m-1 px-2 pt-2 pb-3 space-y-1 flex flex-col'>
            {menuItems.map(([link, title]) => (
              <Link to={link === 'all' ? 'product' : `/product?category=${link}`} key={title}>
                <div
                  key={title}
                  onClick={toggleShopMenu}
                  className={`shadow-md bg-white hover:bg-dark block px-3 py-2 rounded-md text-base font-medium ${
                    searchParams.get('category') === link ? 'bg-primary text-white' : 'text-primary'
                  }`}
                >
                  {title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </OutsiderAlerter>
    );
  };

  const UserLogo = () => {
    return (
      <button
        type='button'
        className='bg-white flex justify-center content-center text-sm rounded-full overflow-clip  border-2 border-primary'
        id='user-menu-button'
        aria-expanded='false'
        aria-haspopup='true'
        onClick={toggleUserMenu}
        ref={menuRef}
      >
        <span className='sr-only'>Open user menu</span>
        {user.photoUrl ? (
          <div className='h-10 w-10 flex items-center justify-center'>
            <img src={user.photoUrl} alt='' className='max-w-full max-h-full' />
          </div>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10' fill='none' viewBox='0 0 24 24' stroke='black' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
          </svg>
        )}
      </button>
    );
  };

  const NoUserLogo = () => {
    return (
      <svg
        onClick={toggleRegLogMenu}
        className='cursor-pointer'
        ref={regLogRef}
        width='31'
        height='31'
        viewBox='0 0 31 31'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M15.5 0.916626C7.45 0.916626 0.916664 7.44996 0.916664 15.5C0.916664 23.55 7.45 30.0833 15.5 30.0833C23.55 30.0833 30.0833 23.55 30.0833 15.5C30.0833 7.44996 23.55 0.916626 15.5 0.916626ZM15.5 5.29163C17.9208 5.29163 19.875 7.24579 19.875 9.66663C19.875 12.0875 17.9208 14.0416 15.5 14.0416C13.0792 14.0416 11.125 12.0875 11.125 9.66663C11.125 7.24579 13.0792 5.29163 15.5 5.29163ZM15.5 26C11.8542 26 8.63125 24.1333 6.75 21.3041C6.79375 18.402 12.5833 16.8125 15.5 16.8125C18.4021 16.8125 24.2062 18.402 24.25 21.3041C22.3687 24.1333 19.1458 26 15.5 26Z'
          fill='#667080'
        />
      </svg>
    );
  };

  return (
    <nav className={`sticky w-full ${detail ? 'bg-secondaryDeep' : 'bg-background z-50'} top-0 flex flex-col`}>
      <div id='topBar' className='pt-6 mx-auto px-2 flex w-full h-auto justify-between content-center z-50'>
        {/* {hidden menu button on small screen} */}
        {location.pathname !== '/product' ? (
          <button
            type='button'
            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary  focus:outline-none focus:ring-2 focus:ring-inset ring-transparent'
            aria-controls='mobile-menu'
            aria-expanded='false'
            onClick={() => navigate(-1)}
            ref={shopRef}
          >
            <span className='sr-only'>Open main menu</span>
            <svg width='12' height='21' viewBox='0 0 12 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M10.25 19L1.75 10.5L10.25 2' stroke='#667080' strokeWidth='3.17' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
        ) : (
          <button
            type='button'
            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary  focus:outline-none focus:ring-2 focus:ring-inset ring-transparent'
            aria-controls='mobile-menu'
            aria-expanded='false'
            onClick={toggleShopMenu}
            ref={shopRef}
          >
            <span className='sr-only'>Open main menu</span>
            <svg className='block h-6 w-6 fill-black' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={`${!shopMenu ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'}`} />
            </svg>
          </button>
        )}
        <div className='flex-1 hidden items-center justify-center sm:items-stretch sm:justify-start sm:flex '>
          <div className='items-center sm:ml-6'>
            <div className='flex space-x-4'>
              {menuItems.map(([link, title]) => (
                <Link to={link === 'all' ? 'product' : `/product?category=${link}`} key={title}>
                  <div
                    key={title}
                    className={`shadow-md bg-white hover:bg-secondaryDeep block px-3 py-2 rounded-md text-base font-medium ${
                      searchParams.get('category') === link ? 'bg-primary text-white' : 'text-primary'
                    }`}
                  >
                    {title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {searchParams.get('category') && (
          <div className='text-black font-semibold sm:hidden table'>
            <div className='align-middle table-cell'>{searchParams.get('category')!.toUpperCase()}</div>
          </div>
        )}
        {(location.pathname === '/cart' || location.pathname === '/orders') && (
        <div className='text-black font-semibold sm:hidden table'>
          <div className='align-middle table-cell'>{location.pathname!.substring(1).toUpperCase()}</div>
        </div>
        )}
        <div className='flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
          {/* Cart Register/Login button */}
          {/* <Link to={'/cart'}>
              <button type='button' className='bg-light p-1 rounded-full text-gray-400 hover:text-white '>
                <div className='flex space-x-2 px-2'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  <div className='text-highlight font-bold'>{sum > 10 ? '10+' : sum}</div>
                </div>
              </button>
            </Link> */}
          {location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/profile' &&(
            <div>
              <div>
                {user.email ? <UserLogo /> : <NoUserLogo />}
                {regLogMenu && (
                  <MenuDropModal>
                    <DropRegLogMenu />
                  </MenuDropModal>
                )}
              </div>
              {userMenu && (
                <MenuDropModal>
                  <DropDownUserMenu />
                </MenuDropModal>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='w-full h-6' />
      {shopMenu && <DropDownProductMenu />}
    </nav>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
    cart: state.cart,
    detail: state.detail,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
