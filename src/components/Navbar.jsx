import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light py-3 mb-5 shadow-sm sticky-top" style={{ 
            background: 'rgba(255, 255, 255, 0.8)', 
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(99, 102, 241, 0.08)'
        }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center fw-bold" to="/dashboard" style={{ letterSpacing: '-0.02em' }}>
                    <svg className="me-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4f46e5" />
                                <stop offset="100%" stopColor="#7c3aed" />
                            </linearGradient>
                        </defs>
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span style={{
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.4rem',
                        fontWeight: 800
                    }}>QuizPortal</span>
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            <Link className={`nav-link d-flex align-items-center px-3 ${location.pathname === '/dashboard' ? 'active text-primary fw-bold' : ''}`} to="/dashboard">
                                <svg className="me-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        {user && user.admin && (
                            <li className="nav-item">
                                <Link className={`nav-link d-flex align-items-center px-3 ${location.pathname.startsWith('/admin') ? 'active text-danger fw-bold' : 'text-danger'}`} to="/admin">
                                    <svg className="me-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    Admin Mode
                                </Link>
                            </li>
                        )}
                    </ul>
                    
                    <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center px-2 py-1.5" style={{ background: 'transparent' }}>
                            <svg className="me-2" style={{ color: 'var(--primary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span className="me-2" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                Welcome, <strong style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{user ? user.username : 'Guest'}</strong>
                            </span>
                            {user && user.admin ? (
                                <span className="badge badge-admin">Admin</span>
                            ) : (
                                <span className="badge badge-user">Student</span>
                            )}
                        </div>
                        <button onClick={handleLogout} className="btn d-flex align-items-center py-2 px-3.5" style={{ 
                            borderRadius: '20px', 
                            fontSize: '0.85rem',
                            background: 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)',
                            color: '#fff',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)',
                            fontWeight: '600',
                            transition: 'all 0.25s ease'
                        }} onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1.5px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.25)';
                        }} onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.15)';
                        }}>
                            <svg className="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;