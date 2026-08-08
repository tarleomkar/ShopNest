import React from 'react';
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <Link to="/">
        <img src="/ShopNest.jpeg" alt="Shopnest Logo" className='navbar-logo' />
        ShopNest
        </Link>
      </div>
      <ul className='navbar-links'>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar