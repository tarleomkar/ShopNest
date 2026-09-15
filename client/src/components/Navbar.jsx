import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useContext } from "react";
import { useSelector } from "react-redux";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItms = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <Link to='/'>
          <img
            src='/ShopNest.jpeg'
            alt='Shopnest Logo'
            style={{ height: "36px", width: "36px" }}
          />
          ShopNest
        </Link>
      </div>
      <ul className='navbar-links'>
        <li>
          <Link to='/shop'>Shop</Link>
        </li>
        <li>
          <Link to='/cart'>Cart ({cartItms.length})</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to='/profile'>Hi, {user.name}</Link>
            </li>
            {user.role === "admin" && (
              <li>
                <Link to='/admin'>Admin</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogOut} className='btn-logout'>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
