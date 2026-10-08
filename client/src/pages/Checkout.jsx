import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { clearCart } from '../redux/cartSclice';
import '../styles/checkout.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems) ?? [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const buildOrderItems = () =>
    cartItems.map(({ productId, qty, price }) => ({
      productId,
      qty,
      price,
    }));

  const saveOrder = async (paymentId) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        items: buildOrderItems(),
        totalAmount: totalPrice,
        address,
        paymentId,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.message || 'Order saving failed');
      return false;
    }
    dispatch(clearCart());
    navigate('/ordersuccess');
    return true;
  };

  const bypassPayment = async () => saveOrder(`bypass_txn_${Date.now()}`);

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        const fallback = window.confirm(
          'Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?',
        );
        if (fallback) {
          await bypassPayment();
        } else {
          alert('Payment failed to initialize. Please try again later.');
        }
        return;
      }

      if (!window.Razorpay) {
        alert('Razorpay script failed to load. Use bypass mode or refresh the page.');
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Order payment',
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          if (verifyRes.ok) {
            await saveOrder(response.razorpay_payment_id);
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999',
        },
        theme: { color: '#f97316' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.token) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    handlePayment();
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={address.fullName}
            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Street"
            required
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
          />
          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
          />
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <p className="checkout-cart-link">
              <Link to="/cart">Back to cart</Link>
            </p>
            <button type="submit" className="btn">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
