import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSclice';
import { resolveProductImageUrl } from '../utils/product-image';
import '../styles/productCard.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setProduct(null);
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) {
          setProduct(null);
          return;
        }
        setProduct(data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: resolveProductImageUrl(product.imageUrl),
        qty: 1,
      }),
    );
    alert('Product added to cart');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', margin: '100px', color: '#f97316' }}>
        Loading Product...
      </div>
    );
  }

  if (!product || !product._id) {
    return (
      <div style={{ textAlign: 'center', margin: '100px', color: '#ef4444' }}>
        Product not found
      </div>
    );
  }

  const imageSrc = resolveProductImageUrl(product.imageUrl);
  const price = Number(product.price);

  return (
    <div
      className="product-detail-wrapper"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}
    >
      <div style={{ color: '#a1a1aa', marginBottom: '20px', fontSize: '0.95rem' }}>
        <Link to="/" style={{ color: '#f97316' }}>Home</Link>
        {' / '}
        <Link to="/shop" style={{ color: '#f97316' }}>Shop</Link>
        {' / '}
        {product.category}
        {' / '}
        <span style={{ color: '#fff' }}>{product.name}</span>
      </div>

      <div className="product-detail">
        <div className="detail-image-container">
          <img src={imageSrc} alt={product.name} className="detail-image" />
        </div>

        <div className="detail-info">
          <h2 style={{ fontSize: '2.8rem', marginBottom: '10px' }}>{product.name}</h2>

          <p className="detail-price" style={{ fontSize: '2.5rem', margin: '15px 0' }}>
            ₹{price.toFixed(2)}
          </p>

          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>Product Description</h4>
            <p style={{ color: '#a1a1aa', lineHeight: '1.8' }}>{product.description}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn"
              style={{ flexGrow: '1', padding: '18px', fontSize: '1.2rem' }}
            >
              Add to Shopping Cart
            </button>
          </div>

          <p
            style={{
              marginTop: '20px',
              color: product.stock > 0 ? '#10b981' : '#ef4444',
              fontWeight: '600',
            }}
          >
            {product.stock > 0
              ? `● In Stock (${product.stock} units available)`
              : '● Temporarily Out of Stock'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
