import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from './redux/utils/thunkCreators';
import { connect } from 'react-redux';
import { State } from './models/redux';
import { Product } from './models/redux';
import ProductCard from './components/ProductCard';

const ProductCategory = (location: any) => {
  switch (location) {
    case '/men':
      return "men's clothing";
    case '/women':
      return "women's clothing";
    case '/jewelery':
      return 'jewelery';
    case '/electronics':
      return 'electronics';
    default:
      return '';
  }
};

type Props = { getProducts: any; products: Product[] };

const Home: React.FC<Props> = ({ getProducts, products }) => {
  let location = useLocation().pathname;

  useEffect(() => {
    getProducts({ category: ProductCategory(location) });
  }, [location]);

  return (
    <div className='justify-center flex flex-wrap max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
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
    getProducts: (params: Product[]) => {
      dispatch(getProducts(params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

//what should redux store? the products? We want the client to send an API request for each category.
//If ton of products, dont want client to sort each time, else,

//do it database way, sort via SQL
//change redux state each time user changes preference

//add reviews
