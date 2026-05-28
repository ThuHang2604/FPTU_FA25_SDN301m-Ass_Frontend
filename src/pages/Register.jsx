import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { toast } from '../utils/toast';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Checkbox để tạo admin
    const [error, setError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate cơ bản
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Gọi action register
            await dispatch(register(username, password, isAdmin));
            // Nếu thành công -> Chuyển sang trang Login
            toast.success("Registration successful! Please login.");
            navigate('/login');
        } catch (errMessage) {
            setError(errMessage);
        }
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
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#registerLogoGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <defs>
                                <linearGradient id="registerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#4f46e5" />
                                    <stop offset="100%" stopColor="#7c3aed" />
                                </linearGradient>
                            </defs>
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h3 className="fw-bold mb-1" style={{ letterSpacing: '-0.02em' }}>Create Account</h3>
                    <p className="text-muted small">Join us and start testing your skills</p>
                </div>

                {error && <div className="alert alert-danger mb-4">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Checkbox Admin */}
                    <div className="mb-4 form-check text-start d-flex align-items-center gap-2 ps-0">
                        <input 
                            type="checkbox" 
                            className="form-check-input position-static m-0" 
                            id="adminCheck"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            style={{ 
                                cursor: 'pointer',
                                width: '16px',
                                height: '16px',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                borderColor: 'rgba(255,255,255,0.1)'
                            }}
                        />
                        <label className="form-check-label text-secondary small" htmlFor="adminCheck" style={{ cursor: 'pointer', userSelect: 'none' }}>
                            Register as Admin
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2.5 fw-bold">
                        Register
                    </button>
                </form>
                
                <div className="mt-4 text-center">
                    <p className="text-muted small mb-0">
                        Already have an account? <a href="/login" className="text-decoration-none" style={{ color: '#818cf8', fontWeight: 600 }}>Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;