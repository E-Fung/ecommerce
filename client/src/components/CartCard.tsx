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

  const dropdownRange = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => i + 1);
  }, []);

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
    <div className='flex bg-white text-black w-full p-4 border-4 rounded-lg'>
      <Link to={`/product/${product.name}`}>
        <div className='h-40 w-40 flex items-center justify-center content-center'>
          <img className='max-h-full max-w-full' src={product?.photoUrl} alt='' />
        </div>
      </Link>
      <div className='flex w-full ml-4 justify-between'>
        <div className='flex flex-col space-y-2'>
          <div className='font-medium'>{product?.name}</div>
          <div className='flex space-x-2'>
            <div className='flex bg-gray-200 rounded text-sm p-1 overflow-clip text-black'>
              <label htmlFor='quantity'>Qty: </label>
              {select && (
                <select
                  id='quantity'
                  name='quantity'
                  defaultValue={quantity}
                  onChange={(event) => updateQuantity(event.target.value)}
                  className='outline-0 bg-gray-200'
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
                    className='bg-gray-200'
                    value={tempQty}
                    onChange={(event) => {
                      setTempQty(Number(event.target.value));
                    }}
                    style={{ width: '45px' }}
                  />
                  <button type='submit'>update</button>
                </form>
              )}
            </div>
            <div className='cursor-pointer hover:text-blue-800 hover:underline' onClick={() => deleteItem()}>
              Delete
            </div>
          </div>
        </div>
        <div className='font-bold'>${(product?.price! * quantity).toFixed(2)}</div>
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
