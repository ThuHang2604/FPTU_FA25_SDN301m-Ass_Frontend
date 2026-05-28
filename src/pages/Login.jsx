import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Lấy state từ Redux
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        // Nếu đã đăng nhập thì chuyển hướng ngay
        if (isAuthenticated) {
            navigate('/dashboard'); // Chúng ta sẽ tạo trang này sau
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 position-relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
            {/* Background glowing decorations */}
            <div className="position-absolute" style={{
                top: '-10%',
                left: '-10%',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.06)',
                filter: 'blur(100px)',
                zIndex: 0
            }}></div>
            <div className="position-absolute" style={{
                bottom: '-10%',
                right: '-10%',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'rgba(168, 85, 247, 0.04)',
                filter: 'blur(100px)',
                zIndex: 0
            }}></div>

            <div className="card p-5 shadow-lg position-relative" style={{ width: '420px', zIndex: 1 }}>
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-white p-3 rounded-4 mb-3 border border-black border-opacity-5 shadow-sm" style={{ width: '60px', height: '60px' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#loginLogoGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <defs>
                                <linearGradient id="loginLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#4f46e5" />
                                    <stop offset="100%" stopColor="#7c3aed" />
                                </linearGradient>
                            </defs>
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h3 className="fw-bold mb-1" style={{ letterSpacing: '-0.02em' }}>Welcome Back</h3>
                    <p className="text-muted small">Please enter your details to sign in</p>
                </div>

                {error && <div className="alert alert-danger mb-4">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2.5 fw-bold" disabled={loading}>
                        {loading ? (
                            <span className="d-flex align-items-center justify-content-center">
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" style={{ color: '#fff' }}></span>
                                Signing in...
                            </span>
                        ) : 'Login'}
                    </button>
                </form>
                
                <div className="mt-4 text-center">
                    <p className="text-muted small mb-0">
                        Don't have an account? <a href="/register" className="text-decoration-none" style={{ color: '#818cf8', fontWeight: 600 }}>Register here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;