import React, { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services';
import { useAuthContext } from '../../../context';
import { ROUTES } from '../../../constants';
import '../Login/login_page.css'; /* ใช้ CSS เดียวกันกับ Login */

const Register: React.FC = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    if (form.password.length < 8) {
      setError('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authService.register({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      // login อัตโนมัติหลังสมัครสำเร็จ
      await login(form.username, form.password);
      navigate(ROUTES.HOME, { replace: true });
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })
        ?.response?.data?.detail ?? 'สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
      </div>

      <div className="auth-card" style={{ maxWidth: 480 }}>
        <div className="auth-logo">
          <span className="auth-logo__icon">🛍️</span>
          <span className="auth-logo__text">MyStore</span>
        </div>

        <h1 className="auth-title">สร้างบัญชีใหม่</h1>
        <p className="auth-subtitle">กรอกข้อมูลเพื่อสมัครสมาชิก</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="auth-error" role="alert">
              <span>⚠️</span> {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">ชื่อ</label>
              <input id="firstName" name="firstName" type="text" className="form-input"
                placeholder="ชื่อ" value={form.firstName} onChange={handleChange} autoFocus />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">นามสกุล</label>
              <input id="lastName" name="lastName" type="text" className="form-input"
                placeholder="นามสกุล" value={form.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">ชื่อผู้ใช้</label>
            <input id="username" name="username" type="text" className="form-input"
              placeholder="กรอกชื่อผู้ใช้" value={form.username} onChange={handleChange}
              autoComplete="username" />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">อีเมล</label>
            <input id="email" name="email" type="email" className="form-input"
              placeholder="example@email.com" value={form.email} onChange={handleChange}
              autoComplete="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">รหัสผ่าน</label>
            <div className="input-wrapper">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'}
                className="form-input" placeholder="อย่างน้อย 8 ตัวอักษร"
                value={form.password} onChange={handleChange} autoComplete="new-password" />
              <button type="button" className="input-toggle-btn"
                onClick={() => setShowPassword(!showPassword)} aria-label="แสดง/ซ่อนรหัสผ่าน">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">ยืนยันรหัสผ่าน</label>
            <input id="confirmPassword" name="confirmPassword"
              type={showPassword ? 'text' : 'password'} className="form-input"
              placeholder="กรอกรหัสผ่านอีกครั้ง" value={form.confirmPassword}
              onChange={handleChange} autoComplete="new-password" />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : 'สมัครสมาชิก'}
          </button>
        </form>

        <p className="auth-switch">
          มีบัญชีอยู่แล้ว?{' '}
          <Link to={ROUTES.LOGIN} className="auth-link">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
