import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SmartErpLogo from '../assets/shapes/smart-erp-logo-header.svg';
import SymbolLogo from '../assets/splash_logo.svg';
import { adminLoginRequest } from './adminApi.js';
import { getAdminToken, setAdminToken } from './adminAuth.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    link.setAttribute('data-admin-login-font', '');
    if (!document.querySelector('link[data-admin-login-font]')) {
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (getAdminToken()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const splashAnimMs = 1600;
    const endFrameHoldMs = 400;
    const timer = window.setTimeout(() => setShowForm(true), splashAnimMs + endFrameHoldMs);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await adminLoginRequest(username, password);
      if (!token) {
        throw new Error('No token returned');
      }
      setAdminToken(token, rememberMe);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
        backgroundColor: '#fff',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {!showForm && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={SymbolLogo}
            alt="IDMS"
            className="admin-splash-logo-scale"
            style={{ width: '630px', height: '210px', objectFit: 'contain' }}
          />
        </div>
      )}

      {showForm && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              aspectRatio: '1366 / 300',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1366 300"
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              height="100%"
            >
              <defs>
                <linearGradient
                  id="admin-hdr-gradient"
                  x1="0"
                  y1="150"
                  x2="1366"
                  y2="150"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#6e8cf0" />
                  <stop offset="1" stopColor="#6e8cf0" />
                </linearGradient>
              </defs>
              <polygon
                fill="url(#admin-hdr-gradient)"
                points="1366 229.79 683 300 0 229.79 0 0 1366 0 1366 229.79"
              />
            </svg>
          </div>

          <div
            className="admin-login-form-reveal"
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 1,
            }}
          >
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              background: '#ffffff',
              boxShadow: '0 0 0.52vw rgba(0,0,0,0.2)',
              border: '0.1vw solid #ff0096',
              borderRadius: '0.2vw',
              padding: '5vh 2.5vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'min(32.5vw, 420px)',
              maxWidth: '92vw',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.5vh',
              }}
            >
              <img src={SmartErpLogo} alt="Smart ERP" style={{ maxHeight: '3.8vh', maxWidth: '100%' }} />
            </div>

            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(to right, #ffffff, #ff0096, #ffffff)',
                margin: '1.5vh 0 2vh',
              }}
            />

            <h5
              style={{
                textAlign: 'center',
                color: '#ff3296',
                fontWeight: 500,
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                marginBottom: '3.5vh',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Login to Admin Panel
            </h5>

            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
              {error ? (
                <div
                  style={{
                    marginBottom: '2vh',
                    padding: '0.6vh 0.78vw',
                    background: '#ffebee',
                    border: '1px solid #ef5350',
                    borderRadius: '2px',
                    color: '#c62828',
                    fontSize: 'clamp(13px, 1vw, 15px)',
                  }}
                  role="alert"
                >
                  {error}
                </div>
              ) : null}

              <div style={{ marginBottom: '3.5vh', textAlign: 'left' }}>
                <label
                  htmlFor="admin-user"
                  style={{
                    display: 'block',
                    color: '#506ed2',
                    fontWeight: 400,
                    fontSize: 'clamp(13px, 1.05vw, 15px)',
                    marginBottom: '0.46vh',
                  }}
                >
                  Username
                </label>
                <input
                  id="admin-user"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your username"
                  required
                  className="admin-login-input"
                  style={{
                    display: 'block',
                    width: '100%',
                    background: '#ffffff',
                    border: '0.5px solid #b1b1b1',
                    color: '#46505a',
                    borderRadius: '2px',
                    fontWeight: 400,
                    fontSize: 'clamp(14px, 1.1vw, 16px)',
                    padding: '0.6vh 0.78vw',
                    fontFamily: "'Inter', sans-serif",
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.85vh', textAlign: 'left' }}>
                <label
                  htmlFor="admin-pass"
                  style={{
                    display: 'block',
                    color: '#506ed2',
                    fontWeight: 400,
                    fontSize: 'clamp(13px, 1.05vw, 15px)',
                    marginBottom: '0.46vh',
                  }}
                >
                  Enter Password
                </label>
                <input
                  id="admin-pass"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter Password"
                  required
                  className="admin-login-input"
                  style={{
                    display: 'block',
                    width: '100%',
                    background: '#ffffff',
                    border: '0.5px solid #b1b1b1',
                    color: '#46505a',
                    borderRadius: '2px',
                    fontWeight: 400,
                    fontSize: 'clamp(14px, 1.1vw, 16px)',
                    padding: '0.6vh 0.78vw',
                    fontFamily: "'Inter', sans-serif",
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    color: '#5a5a5a',
                    fontSize: 'clamp(12px, 1.05vw, 14px)',
                    marginTop: '1vh',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <input
                    type="checkbox"
                    id="admin-showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword((p) => !p)}
                    className="admin-login-checkbox"
                    style={{
                      border: '1px solid #b1b1b1',
                      borderRadius: '2px',
                      appearance: 'none',
                      width: 'clamp(14px, 1.05vw, 18px)',
                      height: 'clamp(14px, 2.08vh, 20px)',
                      cursor: 'pointer',
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  />
                  <label htmlFor="admin-showPassword" style={{ cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    Show Password
                  </label>
                </div>

                <div
                  style={{
                    color: '#5a5a5a',
                    fontSize: 'clamp(12px, 1.05vw, 14px)',
                    marginTop: '1vh',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <input
                    type="checkbox"
                    id="admin-rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="admin-login-checkbox"
                    style={{
                      border: '1px solid #b1b1b1',
                      borderRadius: '2px',
                      appearance: 'none',
                      width: 'clamp(14px, 1.05vw, 18px)',
                      height: 'clamp(14px, 2.08vh, 20px)',
                      cursor: 'pointer',
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  />
                  <label htmlFor="admin-rememberMe" style={{ cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    Remember Me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  height: '5.21vh',
                  minHeight: '44px',
                  marginTop: '2vh',
                  padding: '0.69vh 1.05vw',
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.13vw',
                  backgroundColor: loading ? '#ff66bb' : '#ff0096',
                  border: 'none',
                  color: '#ffffff',
                  width: '100%',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'background-color 0.2s',
                }}
              >
                {loading ? 'Logging in…' : 'Login'}
              </button>
            </form>
          </div>

          <div
            style={{
              marginTop: '2vh',
              textAlign: 'center',
              color: '#6c757d',
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              position: 'relative',
              zIndex: 1,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            © Smart ERP, Developed by IDMS Infotech Pvt. Ltd.
          </div>
          </div>
        </>
      )}

      <style>{`
        .admin-splash-logo-scale {
          animation: adminSplashLogoScale 1.6s ease-out forwards;
          transform-origin: center;
        }
        @keyframes adminSplashLogoScale {
          0% {
            opacity: 0;
            width: 300px;
            height: 100px;
          }
          100% {
            opacity: 1;
            width: min(690px, 90vw);
            height: min(230px, 30vw);
          }
        }
        .admin-login-form-reveal {
          animation: adminLoginFormReveal 0.45s ease-out forwards;
        }
        @keyframes adminLoginFormReveal {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .admin-login-input::placeholder {
          color: #8c8c8c;
        }
        .admin-login-form-reveal label,
        .admin-login-form-reveal input,
        .admin-login-form-reveal button {
          font-family: 'Inter', sans-serif;
        }
        .admin-login-checkbox:checked {
          background-color: #6e8cf0 !important;
          border-color: #6e8cf0 !important;
        }
        .admin-login-checkbox:checked::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: clamp(10px, 0.8vw, 12px);
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
