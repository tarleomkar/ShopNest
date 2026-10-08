import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#f97316', marginBottom: '24px' }}>Admin Dashboard</h2>
      <div style={gridStyle}>
        <Link to="/admin/products" style={cardStyle}>Manage Products</Link>
        <Link to="/admin/add-product" style={cardStyle}>Add Product</Link>
        <Link to="/admin/orders" style={cardStyle}>Manage Orders</Link>
        <Link to="/admin/users" style={cardStyle}>View Users</Link>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '30px',
  background: '#18181b',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.05)',
  color: '#fafafa',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '16px',
};

const cardStyle = {
  display: 'block',
  padding: '24px',
  background: '#09090b',
  border: '1px solid #27272a',
  borderRadius: '8px',
  color: '#f97316',
  fontWeight: 600,
  textAlign: 'center',
};

export default AdminDashboard;
