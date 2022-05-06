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
      if (Number(quantity) <= 0) {
        deleteItem();
      } else {
        if (user.email) {
          updatedItem = { quantity: Number(quantity), productId: product.productId, userId: user.email };
        } else {
          updatedItem = { quantity: Number(quantity), productId: product.productId };
        }
        await adjustCartItem(updatedItem);
        setTempQty(Number(quantity));
      }
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
    <div className='flex bg-white text-black border-2 rounded-lg justify-between p-2 w-1-2 space-x-3 relative'>
      <Link to={`/product/${product.name}`} className='flex items-center'>
        <div className='h-20 w-20 p-1 flex items-center justify-center content-center'>
          <img className='max-h-full max-w-full' src={product?.photoUrl} alt='' />
        </div>
      </Link>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col space-y-2 w-full'>
          <div className='font-medium'>{product?.name}</div>
          <div className='font-semibold text-gray-400'>${(product?.price! * quantity).toFixed(2)}</div>
        </div>
      </div>

      <div className='flex space-x-2 items-center'>
        <div className='bg-white flex space-x-2'>
          <button onClick={() => updateQuantity(String(tempQty - 1))} className='h-6 w-6 flex justify-center items-center bg-secondary rounded-md'>
            <svg width='14' height='4' viewBox='0 0 14 4' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
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
              className='flex text-center'
              value={tempQty}
              onChange={(event) => {
                setTempQty(Number(event.target.value));
              }}
              style={{ width: '20px' }}
            />
            {/* <button type='submit'>update</button> */}
          </form>
          <button onClick={() => updateQuantity(String(tempQty + 1))} className='h-6 w-6 flex justify-center items-center bg-secondary rounded-md'>
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.60347 8.08335H12.4368C13.0348 8.08335 13.5201 7.59802 13.5201 7.00002C13.5201 6.40202 13.0348 5.91669 12.4368 5.91669H1.60347C1.00547 5.91669 0.520142 6.40202 0.520142 7.00002C0.520142 7.59802 1.00547 8.08335 1.60347 8.08335Z'
                fill='#393F48'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
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
        <button
          className='shadow-inner bg-secondary p-1 rounded-lg -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:text-blue-800 hover:underline absolute left-0 top-0'
          onClick={() => deleteItem()}
        >
          <svg width='20' height='22' viewBox='0 0 20 22' fill='black' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M18.3571 3.66667H13.2143V3C13.2137 2.46975 13.0104 1.96138 12.6488 1.58643C12.2872 1.21148 11.797 1.00058 11.2857 1H8.71429C8.20297 1.00058 7.71276 1.21148 7.3512 1.58643C6.98964 1.96138 6.78628 2.46975 6.78571 3V3.66667H1.64286C1.47236 3.66667 1.30885 3.7369 1.18829 3.86193C1.06773 3.98695 1 4.15652 1 4.33333C1 4.51014 1.06773 4.67971 1.18829 4.80474C1.30885 4.92976 1.47236 5 1.64286 5H2.98L4.11824 19.166C4.16094 19.6649 4.38156 20.1294 4.73697 20.4686C5.09238 20.8078 5.55701 20.9972 6.04 21H13.96C14.4431 20.9973 14.9078 20.8079 15.2633 20.4687C15.6188 20.1295 15.8394 19.665 15.8821 19.166L17.02 5H18.3571C18.5276 5 18.6912 4.92976 18.8117 4.80474C18.9323 4.67971 19 4.51014 19 4.33333C19 4.15652 18.9323 3.98695 18.8117 3.86193C18.6912 3.7369 18.5276 3.66667 18.3571 3.66667ZM8.07143 3C8.07165 2.82326 8.13945 2.65382 8.25996 2.52885C8.38047 2.40387 8.54386 2.33356 8.71429 2.33333H11.2857C11.4561 2.33356 11.6195 2.40387 11.74 2.52885C11.8605 2.65382 11.9284 2.82326 11.9286 3V3.66667H8.07143V3ZM14.6005 19.0553C14.5862 19.2216 14.5127 19.3764 14.3943 19.4895C14.2758 19.6025 14.121 19.6657 13.96 19.6667H6.04C5.87899 19.6658 5.7241 19.6026 5.60562 19.4896C5.48714 19.3765 5.41361 19.2217 5.39939 19.0553L4.27015 5H15.7298L14.6005 19.0553Z'
              stroke='white'
              strokeWidth='0.5'
            />
            <path
              d='M8.07181 7.66602C7.90132 7.66602 7.7378 7.73625 7.61724 7.86128C7.49668 7.9863 7.42896 8.15587 7.42896 8.33268V16.3327C7.42896 16.5095 7.49668 16.6791 7.61724 16.8041C7.7378 16.9291 7.90132 16.9993 8.07181 16.9993C8.24231 16.9993 8.40582 16.9291 8.52638 16.8041C8.64694 16.6791 8.71467 16.5095 8.71467 16.3327V8.33268C8.71467 8.15587 8.64694 7.9863 8.52638 7.86128C8.40582 7.73625 8.24231 7.66602 8.07181 7.66602Z'
              stroke='white'
              strokeWidth='0.5'
            />
            <path
              d='M11.929 7.66602C11.7585 7.66602 11.595 7.73625 11.4744 7.86128C11.3539 7.9863 11.2861 8.15587 11.2861 8.33268V16.3327C11.2861 16.5095 11.3539 16.6791 11.4744 16.8041C11.595 16.9291 11.7585 16.9993 11.929 16.9993C12.0995 16.9993 12.263 16.9291 12.3836 16.8041C12.5041 16.6791 12.5718 16.5095 12.5718 16.3327V8.33268C12.5718 8.15587 12.5041 7.9863 12.3836 7.86128C12.263 7.73625 12.0995 7.66602 11.929 7.66602Z'
              stroke='white'
              strokeWidth='0.5'
            />
          </svg>
        </button>
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
