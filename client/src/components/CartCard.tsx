import React, { useState, useEffect, useMemo } from 'react';
import { State, Product, CartItem, User } from '../models/redux';
import { connect } from 'react-redux';
import { adjustCartItem, deleteCartItem } from '../redux/utils/thunkCreators';
import { Link } from 'react-router-dom';

type Props = { product: Product; user: User; quantity: number; adjustCartItem: any; deleteCartItem: any };

const CartCard: React.FC<Props> = ({ product, user, quantity, adjustCartItem, deleteCartItem }) => {
  const [tempQty, setTempQty] = useState<number>(quantity);
  const [select, setSelect] = useState<boolean>(true);

  useEffect(() => {
    updateSelect();
  }, [quantity]);

  // const dropdownRange = useMemo(() => {
  //   return Array.from({ length: 9 }, (_, i) => i + 1);
  // }, []);

  const handleInputEnter = (event: any) => {
    const textInput: HTMLElement = document.querySelector('#quantityInput')!;
    if (event.keyCode === 13) {
      textInput.blur();
      updateQuantity(String(tempQty));
      updateSelect();
    }
  };

  const updateSelect = () => {
    if (quantity < 10) setSelect(true);
    else setSelect(false);
  };

  const updateQuantity = async (quantity: string) => {
    if (quantity === 'changeType') {
      setSelect(false);
    } else {
      let updatedItem = {};
      if (user.email) {
        updatedItem = { quantity: Number(quantity), productId: product.productId, userId: user.email };
      } else {
        updatedItem = { quantity: Number(quantity), productId: product.productId };
      }
      await adjustCartItem(updatedItem);
      setTempQty(Number(quantity));
    }
  };

  const deleteItem = async () => {
    let deleteItem = {};
    if (user.email) {
      deleteItem = { productId: product.productId, userId: user.email };
    } else {
      deleteItem = { productId: product.productId };
    }
    await deleteCartItem(deleteItem);
  };

  return (
    <div className='flex bg-white text-black border-4 rounded-lg'>
      <Link to={`/product/${product.name}`}>
        <div className='h-20 w-20 p-1 flex items-center justify-center content-center'>
          <img className='max-h-full max-w-full' src={product?.photoUrl} alt='' />
        </div>
      </Link>
      <div className='flex w-full justify-between'>
        <div className='flex flex-col space-y-2'>
          <div className='font-medium'>{product?.name}</div>
          <div className='font-semibold text-gray-400'>${(product?.price! * quantity).toFixed(2)}</div>
        </div>
        <div className='flex space-x-2 items-center'>
          <div className='bg-white flex h-4 space-x-2'>
            <button className='h-6 w-6 flex justify-center items-center bg-secondary rounded-sm'>
              <svg width='14' height='4' viewBox='0 0 14 4' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M1.60347 3.08335H12.4368C13.0348 3.08335 13.5201 2.59802 13.5201 2.00002C13.5201 1.40202 13.0348 0.916687 12.4368 0.916687H1.60347C1.00547 0.916687 0.520142 1.40202 0.520142 2.00002C0.520142 2.59802 1.00547 3.08335 1.60347 3.08335Z'
                  fill='#393F48'
                />
              </svg>
            </button>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateQuantity(String(tempQty));
                updateSelect();
              }}
              onKeyDown={(event) => {
                handleInputEnter(event);
              }}
            >
              <input
                id='quantityInput'
                name='quantity'
                type='number'
                className='bg-gray-200 flex'
                value={tempQty}
                onChange={(event) => {
                  setTempQty(Number(event.target.value));
                }}
                style={{ width: '20px' }}
              />
              <button type='submit'>update</button>
            </form>
            <button className='h-6 w-6 flex justify-center items-center bg-secondary rounded-sm'>
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M1.60347 8.08335H12.4368C13.0348 8.08335 13.5201 7.59802 13.5201 7.00002C13.5201 6.40202 13.0348 5.91669 12.4368 5.91669H1.60347C1.00547 5.91669 0.520142 6.40202 0.520142 7.00002C0.520142 7.59802 1.00547 8.08335 1.60347 8.08335Z'
                  fill='#393F48'
                />
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M8.10356 12.4167V1.58333C8.10356 0.985333 7.61822 0.5 7.02022 0.5C6.42222 0.5 5.93689 0.985333 5.93689 1.58333V12.4167C5.93689 13.0147 6.42222 13.5 7.02022 13.5C7.61822 13.5 8.10356 13.0147 8.10356 12.4167Z'
                  fill='#393F48'
                />
              </svg>
            </button>
          </div>
          {/* <div className='flex rounded text-sm p-1 overflow-clip text-black'>
            <label htmlFor='quantity'>Qty: </label>
            {select && (
              <select
                id='quantity'
                name='quantity'
                defaultValue={quantity}
                onChange={(event) => updateQuantity(event.target.value)}
                className='outline-0 bg-gray-200 flex'
              >
                {dropdownRange.map((number) => (
                  <option value={number} key={number}>
                    {number}
                  </option>
                ))}
                <option value={'changeType'} key={'changeType'}>
                  +10
                </option>
              </select>
            )}
            {!select && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  updateQuantity(String(tempQty));
                  updateSelect();
                }}
                onKeyDown={(event) => {
                  handleInputEnter(event);
                }}
              >
                <input
                  id='quantityInput'
                  name='quantity'
                  type='number'
                  className='bg-gray-200 flex'
                  value={tempQty}
                  onChange={(event) => {
                    setTempQty(Number(event.target.value));
                  }}
                  style={{ width: '45px' }}
                />
                <button type='submit'>update</button>
              </form>
            )}
          </div> */}
          {/* <div className='cursor-pointer hover:text-blue-800 hover:underline' onClick={() => deleteItem()}>
            Delete
          </div> */}
        </div>
      </div>
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
    adjustCartItem: (params: CartItem) => {
      dispatch(adjustCartItem(params));
    },
    deleteCartItem: (params: CartItem) => {
      dispatch(deleteCartItem(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
