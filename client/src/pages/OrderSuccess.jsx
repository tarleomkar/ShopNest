import { Link } from 'react-router-dom';

const OrderSuccess = () => (
  <div className="checkout-container" style={{ textAlign: 'center' }}>
    <h2>Order placed successfully</h2>
    <p style={{ color: '#a1a1aa', marginBottom: '24px' }}>
      Thank you for shopping with ShopNest.
    </p>
    <Link to="/shop" className="btn">Continue Shopping</Link>
  </div>
);

export default OrderSuccess;
