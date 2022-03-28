import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CartItem, State, Product } from './models/redux';
import CartCard from './components/CartCard';
import { getProductsById } from './services/services';

type Props = { cart: CartItem[] };

const CartPage: React.FC<Props> = ({ cart }) => {
  const [cartProducts, setCartProducts] = useState<Product[]>();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (): Promise<void> => {
    const tempArray = await getProductsById(cart);
    const tempDetails: Product[] = tempArray.map((productData) => {
      return productData.data;
    });
    setCartProducts(tempDetails);
  };

  if (!cart.length) {
    return (
      <div className='w-full h-full py-80 flex justify-center'>
        <div className='text-5xl'>No Items in Cart</div>
      </div>
    );
  }

  if (!cartProducts) {
    return <></>;
  }
  console.log(cartProducts);
  return (
    <div className='justify-center flex flex-wrap space-y-2 max-w-7xl mx-auto p-4 sm:px-6 lg:px-8'>
      <div className='bg-white w-full space-y-4'>
        <div className='text-black'>Shopping Cart</div>
        {cartProducts.map((product: Product, index: number) => (
          <CartCard product={product} quantity={cart[index].quantity} key={product.productId} />
        ))}
        <div className='flex justify-between p-4 border-4 text-black'>
          <div>Total</div>
          <div className='font-bold border-2'>
            Total: $
            {cartProducts
              .reduce(function (total: number, product: Product, index) {
                return total + product.price * cart[index].quantity;
              }, 0)
              .toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(CartPage);
