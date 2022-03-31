import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem } from '../models/redux';
import { connect } from 'react-redux';
import { adjustCart } from '../redux/utils/thunkCreators';

type Props = { product: Product; quantity: number; adjustCart: any };

const CartCard: React.FC<Props> = ({ product, quantity, adjustCart }) => {
  const [tempQty, setTempQty] = useState<number>(quantity);
  const [select, setSelect] = useState<boolean>(true);

  const handleInputEnter = (event: any) => {
    const textInput: HTMLElement = document.querySelector('#quantityInput')!;
    if (event.keyCode === 13) {
      textInput.blur();
      updateQuantity(String(tempQty));
      updateSelect();
    }
  };

  const dropdownRange = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => i + 1);
  }, []);

  const updateQuantity = async (quantity: string) => {
    if (quantity === 'changeType') {
      setSelect(false);
    } else {
      const updatedItem = { quantity: Number(quantity), productId: product.productId };
      await adjustCart(updatedItem);
      setTempQty(Number(quantity));
    }
  };

  useEffect(() => {
    updateSelect();
  }, [quantity]);

  const updateSelect = () => {
    if (quantity < 10) setSelect(true);
    else setSelect(false);
  };

  const deleteItem = () => {};

  return (
    <div className='flex text-black w-full p-4 border-4'>
      <div className='h-40 w-40 flex items-center justify-center content-center border-2'>
        <img className='max-h-full max-w-full' src={product?.photoUrl} alt='' />
      </div>
      <div className='flex w-full ml-4 justify-between'>
        <div className='border-2 flex flex-col'>
          <div className='font-medium'>{product?.name}</div>
          <div className='flex'>
            <div className='flex bg-gray-300 rounded text-sm p-1 overflow-clip '>
              <label htmlFor='quantity'>Qty: </label>
              {select && (
                <select
                  id='quantity'
                  name='quantity'
                  defaultValue={quantity}
                  onChange={(event) => updateQuantity(event.target.value)}
                  className='text-black bg-gray-300'
                >
                  {dropdownRange.map((number) => (
                    <option value={number} key={number} className='text-black'>
                      {number}
                    </option>
                  ))}
                  <option value={'changeType'} key={'changeType'} className='text-black'>
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
                    value={tempQty}
                    onChange={(event) => {
                      setTempQty(Number(event.target.value));
                    }}
                  />
                  <button type='submit'>update</button>
                </form>
              )}
            </div>
            <div onClick={deleteItem}>Delete</div>
          </div>
        </div>
        <div className='border-2 font-bold'>${(product?.price! * quantity).toFixed(2)}</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    adjustCart: (params: CartItem) => {
      dispatch(adjustCart(params));
    },
  };
};

export default connect(null, mapDispatchToProps)(CartCard);
