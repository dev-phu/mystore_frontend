import React, { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../context";
import { ROUTES } from "../../../constants";
import { Eye, EyeOff } from "lucide-react";
import "./login_page.css";

const Login: React.FC = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // หน้าที่ต้องการไปหลัง login (ถ้า redirect มาจาก PrivateRoute)
  const from =
    (location.state as { from?: Location })?.from?.pathname ?? ROUTES.HOME;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response) {
        setError(
          `Error: ${err.response.status} - ${JSON.stringify(err.response.data)}`,
        );
      } else if (err.request) {
        setError("Network Error: ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background decoration */}
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
      </div>

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo__icon">
            <img src="/logo/logo1.PNG" alt="Hanni Logo" className="logo-img" />
          </span>
          <span className="auth-logo__text">Hanni</span>
        </div>

        <h1 className="auth-title"></h1>
        <p className="auth-subtitle">Welcome back</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Error */}
          {error && (
            <div className="auth-error" role="alert">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "Password"}
                className="form-input"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="show/hide password"
              >
                {showPassword ? (
                  <EyeOff size={20} color="#000000" />
                ) : (
                  <Eye size={20} color="#000000" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account yet?{" "}
          <Link to={ROUTES.REGISTER} className="auth-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
