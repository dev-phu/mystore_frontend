import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context';
import { ROUTES } from '../constants';

/**
 * ครอบ route ที่ต้อง login ก่อนเข้า
 * ถ้ายังไม่ได้ login → redirect ไป /auth/login และจำหน้าที่จะไปไว้ใน state
 */
const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  // รอ AuthProvider โหลด token จาก localStorage ก่อน
  if (isLoading) {
    return <div className="loading-screen">กำลังโหลด...</div>;
  }

  return isAuthenticated
    ? <Outlet />
    : <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
};

export default PrivateRoute;
