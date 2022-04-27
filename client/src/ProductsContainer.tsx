import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from './redux/utils/thunkCreators';
import { connect } from 'react-redux';
import { State, Product } from './models/redux';
import ProductCard from './components/ProductCard';

type Props = { fetchProducts: any; products: Product[] };

const ProductsContainer: React.FC<Props> = ({ fetchProducts, products }) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const category = searchParams.get('category');
      await fetchProducts(category ? category : '');
    })();
  }, [searchParams]);

  return (
    <div className='justify-center flex flex-wrap w-full max-w-7xl mx-auto px-2 sm:px-2 md:px-6 lg:px-8'>
      {products.map((product: Product) => (
        <ProductCard product={product} key={product.name} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProducts: (params: string) => {
      dispatch(fetchProducts(params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);

//what should redux store? the products? We want the client to send an API request for each category.
//If ton of products, dont want client to sort each time, else,

//do it database way, sort via SQL
//change redux state each time user changes preference

//add reviews
