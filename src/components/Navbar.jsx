import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/dashboard">Quiz App</Link>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Home</Link>
                        </li>
                        {/* Kiểm tra Admin để hiện Link sang trang quản trị */}
                        {user && user.admin && (
                            <li className="nav-item">
                                <Link className="nav-link text-danger fw-bold" to="/admin">
                                    Admin Mode
                                </Link>
                            </li>
                        )}
                    </ul>
                    
                    <div className="d-flex align-items-center">
                        <span className="me-3">Welcome, <strong>{user ? user.username : 'User'}</strong></span>
                        <button onClick={handleLogout} className="btn btn-outline-secondary btn-sm">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;