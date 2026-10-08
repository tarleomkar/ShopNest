import { Link } from 'react-router-dom'
import "../styles/productCard.css";
import { resolveProductImageUrl } from '../utils/product-image';

const productCard = ({ product }) => {
  const imageSrc = resolveProductImageUrl(product.imageUrl);
  return (
    <div className='product-card'>
        <img src={imageSrc} alt={product.name} className='product-image' />
        <div className='product-info'>
            <h3 className='product-name'>{product.name}</h3>
            <p className='product-price'>₹{product.price.toFixed(2)}</p>
            <Link to={`/product/${product._id}`} className='view-details-button'>
                view Details
            </Link>
        </div>
    </div>
  );
};

export default productCard