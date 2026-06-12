import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useAuthContext, useCartContext } from "../../../context";
import { ROUTES } from "../../../constants";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const { totalItems } = useCartContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="navbar__logo">
          <img src="/logo/logo1.PNG" alt="Hanni Logo" className="logo-img" />
          Hanni
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          <li>
            <NavLink
              to={ROUTES.HOME}
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.PRODUCTS}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              PRODUCTS
            </NavLink>
          </li>
          {user?.role === "SELLER" && (
            <li>
              <NavLink
                to={ROUTES.ADMIN.PRODUCTS}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                MY SHOP
              </NavLink>
            </li>
          )}
        </ul>

        {/* Search Bar */}
        <div className="navbar__search">
          <Search size={18} className="search-icon" color="#94a3b8" />
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
          />
        </div>

        {/* Right side */}
        <div className="navbar__actions">
          {/* Cart */}
          <Link
            to={ROUTES.CART}
            className="navbar__cart-btn"
            aria-label="ตะกร้าสินค้า"
          >
            <img src="/logo/cart.png" alt="cart logo" className="cart-img" />
            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="navbar__user">
              <button
                className="navbar__user-btn"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="user-avatar">
                  {user?.first_name?.charAt(0) ?? "?"}
                </span>
                <span className="user-name">
                  {user?.first_name || user?.username}
                </span>
                <span className="chevron">{menuOpen ? "▲" : "▼"}</span>
              </button>
              {menuOpen && (
                <div className="navbar__dropdown">
                  <Link to={ROUTES.ORDERS} onClick={() => setMenuOpen(false)}>
                    Order History
                  </Link>
                  <Link to={ROUTES.PROFILE} onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth-links">
              <Link to={ROUTES.LOGIN} className="btn-ghost">
                Login
              </Link>
              <Link to={ROUTES.REGISTER} className="btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
