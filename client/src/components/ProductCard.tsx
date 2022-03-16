import React from 'react';
import { Link } from 'react-router-dom';

type Props = { product: any };

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className='my-1/2 p-1 w-1/2 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/4 xl:w-1/5'>
      <Link to={`/product/${product.id}`}>
        <img src={product.photoUrl} alt='' />
      </Link>
    </div>
  );
};

export default ProductCard;
