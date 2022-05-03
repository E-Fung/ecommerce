import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { State, CartItem, Product, User } from '../models/redux';
import { addToCart } from '../redux/utils/thunkCreators';

//mx-auto - centers container
//max-w-7xl - constrains the container

//relative makes it so that the sub component's css is relative to this container
type Props = { cart: CartItem[]; detail: Product; addToCart: any; user: User };

const Navbar: React.FC<Props> = ({ cart, detail, user, addToCart }) => {
  const location = useLocation();
  const sum = cart.reduce((partialSum, currentValue) => partialSum + currentValue.quantity, 0);

  const handleAddToCart = async (event: any) => {
    event.preventDefault();
    const quantity: number = Number(event.target.quantity.value);
    const productId: number = detail!.productId;
    if (user.userId) {
      const userId = user.userId;
      await addToCart({ quantity, userId, productId });
    } else {
      await addToCart({ quantity, productId });
    }
  };

  const dropdownRange = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => i + 1);
  }, []);

  return (
    <div className='sticky bottom-0 flex flex-col'>
      {detail && (
        <div id='addCartNavbar' className='bg-primary rounded-t-3xl w-full px-8 pt-4'>
          <form onSubmit={handleAddToCart} className='flex justify-between align-center mb-4'>
            <div className='text-white'>
              <div className='text-gray-300 text-sm'>Price</div>
              <div className='text-md font-semibold'>${detail.price.toFixed(2)}</div>
            </div>
            <div className='flex items-center space-x-2'>
              <select id='quantity' name='quantity' className='text-black rounded-lg'>
                {dropdownRange.map((number) => (
                  <option value={number} key={number} className='text-black'>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex content-center'>
              <button
                type='submit'
                className='text-white bg-primaryDeep hover:bg-highlight focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center '
              >
                Add to Cart
              </button>
            </div>
          </form>
        </div>
      )}
      <div className={`${detail ? 'bg-primary' : ''}`}>
        <nav id='navbar' style={{ boxShadow: '0px 6px 10px 0px #393F48' }} className='bg-white px-4 pt-4 pb-2 w-full rounded-t-3xl flex justify-between'>
          <Link to={'/product'}>
            <div className={`flex flex-col ${location.pathname === '/product' ? 'fill-primary' : 'fill-secondaryDeep'} space-y-2 hover:fill-primary`}>
              <svg width='21' height='18' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                <path d='M8.41665 17.8333V11.5833H12.5833V17.8333H17.7916V9.5H20.9166L10.5 0.125L0.083313 9.5H3.20831V17.8333H8.41665Z' />
              </svg>
              <div className={`flex justify-center ${location.pathname === '/product' ? 'fill-primary' : 'fill-transparent'}`}>
                <svg width='8' height='2' viewBox='0 0 8 2' xmlns='http://www.w3.org/2000/svg'>
                  <rect width='8' height='2' rx='1' />
                </svg>
              </div>
              {/* <span className='bottom-full text-black absolute '>Tooltip text</span> */}
            </div>
          </Link>
          <Link to={'/wishlist'}>
            <div>
              <div className={`flex flex-col ${location.pathname === '/wishlist' ? 'fill-primary' : 'fill-secondaryDeep'} space-y-2 hover:fill-primary`}>
                <svg width='22' height='20' viewBox='0 0 22 20' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M10.8334 19.2396L9.323 17.8646C3.95842 13 0.416748 9.79167 0.416748 5.85417C0.416748 2.64583 2.93758 0.125 6.14592 0.125C7.95842 0.125 9.698 0.96875 10.8334 2.30208C11.9688 0.96875 13.7084 0.125 15.5209 0.125C18.7292 0.125 21.2501 2.64583 21.2501 5.85417C21.2501 9.79167 17.7084 13 12.3438 17.875L10.8334 19.2396Z' />
                </svg>{' '}
                <div className={`flex justify-center ${location.pathname === '/wishlist' ? 'fill-primary' : 'fill-transparent'}`}>
                  <svg width='8' height='2' viewBox='0 0 8 2' xmlns='http://www.w3.org/2000/svg'>
                    <rect width='8' height='2' rx='1' />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          <Link to={'/cart'}>
            <div>
              {sum !== 0 && (
                <div className='flex justify-center'>
                  <div className='text-white text-xs font-semibold absolute bg-highlight rounded-full px-1 -translate-y-1/2 translate-x-1/2'>
                    {sum > 10 ? '10+' : sum}
                  </div>
                </div>
              )}
              <div className={`flex flex-col ${location.pathname === '/cart' ? 'fill-primary' : 'fill-secondaryDeep'} space-y-2 hover:fill-primary`}>
                <svg width='21' height='21' viewBox='0 0 21 21' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M6.29163 16.75C5.14579 16.75 4.21871 17.6875 4.21871 18.8333C4.21871 19.9792 5.14579 20.9167 6.29163 20.9167C7.43746 20.9167 8.37496 19.9792 8.37496 18.8333C8.37496 17.6875 7.43746 16.75 6.29163 16.75ZM0.041626 0.0833435V2.16668H2.12496L5.87496 10.0729L4.46871 12.625C4.30204 12.9167 4.20829 13.2604 4.20829 13.625C4.20829 14.7708 5.14579 15.7083 6.29163 15.7083H18.7916V13.625H6.72913C6.58329 13.625 6.46871 13.5104 6.46871 13.3646L6.49996 13.2396L7.43746 11.5417H15.1979C15.9791 11.5417 16.6666 11.1146 17.0208 10.4688L20.75 3.70834C20.8333 3.56251 20.875 3.38543 20.875 3.20834C20.875 2.63543 20.4062 2.16668 19.8333 2.16668H4.42704L3.44788 0.0833435H0.041626ZM16.7083 16.75C15.5625 16.75 14.6354 17.6875 14.6354 18.8333C14.6354 19.9792 15.5625 20.9167 16.7083 20.9167C17.8541 20.9167 18.7916 19.9792 18.7916 18.8333C18.7916 17.6875 17.8541 16.75 16.7083 16.75Z' />
                </svg>{' '}
                <div className={`flex justify-center ${location.pathname === '/cart' ? 'fill-primary' : 'fill-transparent'}`}>
                  <svg width='8' height='2' viewBox='0 0 8 2' xmlns='http://www.w3.org/2000/svg'>
                    <rect width='8' height='2' rx='1' />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    cart: state.cart,
    detail: state.detail,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToCart: (params: CartItem) => {
      dispatch(addToCart(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
