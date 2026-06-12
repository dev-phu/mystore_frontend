import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext, useCartContext } from '../../../context';
import { ROUTES } from '../../../constants';
import './Navbar.css';

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
          🛍️ MyStore
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          <li><NavLink to={ROUTES.HOME} end className={({ isActive }) => isActive ? 'active' : ''}>หน้าหลัก</NavLink></li>
          <li><NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => isActive ? 'active' : ''}>สินค้า</NavLink></li>
          {user?.role === 'admin' && (
            <li><NavLink to={ROUTES.ADMIN.DASHBOARD} className={({ isActive }) => isActive ? 'active' : ''}>Admin</NavLink></li>
          )}
        </ul>

        {/* Right side */}
        <div className="navbar__actions">
          {/* Cart */}
          <Link to={ROUTES.CART} className="navbar__cart-btn" aria-label="ตะกร้าสินค้า">
            <span className="cart-icon">🛒</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems > 99 ? '99+' : totalItems}</span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="navbar__user">
              <button className="navbar__user-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <span className="user-avatar">{user?.firstName?.charAt(0) ?? '?'}</span>
                <span className="user-name">{user?.firstName}</span>
                <span className="chevron">{menuOpen ? '▲' : '▼'}</span>
              </button>
              {menuOpen && (
                <div className="navbar__dropdown">
                  <Link to={ROUTES.ORDERS} onClick={() => setMenuOpen(false)}>คำสั่งซื้อของฉัน</Link>
                  <Link to={ROUTES.PROFILE} onClick={() => setMenuOpen(false)}>โปรไฟล์</Link>
                  <hr />
                  <button onClick={handleLogout} className="logout-btn">ออกจากระบบ</button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth-links">
              <Link to={ROUTES.LOGIN} className="btn-ghost">เข้าสู่ระบบ</Link>
              <Link to={ROUTES.REGISTER} className="btn-primary">สมัครสมาชิก</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
