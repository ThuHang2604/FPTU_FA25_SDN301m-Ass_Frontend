import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuizzes } from '../redux/actions/quizActions';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; // <--- Import hook điều hướng

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // <--- Khởi tạo hook
    const { quizzes, loading, error } = useSelector((state) => state.quiz);

    useEffect(() => {
        dispatch(getAllQuizzes());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <div className="container pb-5">
                {/* Hero Banner Section */}
                <div className="p-5 mb-5 rounded-4 position-relative overflow-hidden" style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.08)'
                }}>
                    <div className="position-absolute" style={{ top: '-50%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.08)', filter: 'blur(80px)' }}></div>
                    <div className="row align-items-center position-relative" style={{ zIndex: 1 }}>
                        <div className="col-lg-8">
                            <span className="badge mb-3" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#4f46e5', padding: '0.5em 1em', borderRadius: '30px', fontWeight: 600 }}>QUIZ PORTAL</span>
                            <h1 className="fw-extrabold mb-3" style={{ letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #0f172a 40%, #475569 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.5rem' }}>Test Your Knowledge</h1>
                            <p className="lead text-secondary mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>Select a topic below to begin. Challenge yourself, check your understanding, and track your performance details in real-time.</p>
                        </div>
                        <div className="col-lg-4 text-lg-end mt-4 mt-lg-0 d-none d-lg-block">
                            <div className="d-inline-flex align-items-center justify-content-center bg-white bg-opacity-5 p-4 rounded-4 border border-white border-opacity-10 shadow-lg">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="url(#dashHeroGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <defs>
                                        <linearGradient id="dashHeroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h3 className="fw-bold m-0 d-flex align-items-center" style={{ letterSpacing: '-0.02em' }}>
                        <svg className="me-2 text-primary" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        Available Quizzes
                    </h3>
                    <span className="text-secondary small fw-medium">{quizzes ? quizzes.length : 0} Quizzes Total</span>
                </div>
                
                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                
                {error && <div className="alert alert-danger shadow-sm mb-4">{error}</div>}

                <div className="row">
                    {quizzes && quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <div key={quiz._id} className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 hover-lift shadow-sm">
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <span className="badge px-2.5 py-1.5 rounded-3 small d-flex align-items-center" style={{ 
                                                fontSize: '0.75rem',
                                                background: 'rgba(124, 58, 237, 0.08)',
                                                color: '#5b21b6',
                                                border: '1px solid rgba(124, 58, 237, 0.15)'
                                            }}>
                                                <svg className="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                    <line x1="16" y1="13" x2="8" y2="13" />
                                                    <line x1="16" y1="17" x2="8" y2="17" />
                                                    <polyline points="10 9 9 9 8 9" />
                                                </svg>
                                                {quiz.questions ? quiz.questions.length : 0} Questions
                                            </span>
                                            <span className="badge px-2.5 py-1.5 rounded-3 small" style={{ 
                                                fontSize: '0.75rem',
                                                background: 'rgba(124, 58, 237, 0.08)',
                                                color: '#5b21b6',
                                                border: '1px solid rgba(124, 58, 237, 0.15)'
                                            }}>
                                                Practice Mode
                                            </span>
                                        </div>
                                        
                                        <h5 className="card-title fw-bold mb-2" style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{quiz.title}</h5>
                                        <p className="card-text text-secondary mb-4 flex-grow-1" style={{ 
                                            fontSize: '0.9rem', 
                                            lineHeight: '1.5',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            minHeight: '42px'
                                        }}>
                                            {quiz.description || "No description available."}
                                        </p>
                                        
                                        <button 
                                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 mt-auto"
                                            onClick={() => navigate(`/quiz/${quiz._id}`)} // <--- Xử lý chuyển trang
                                        >
                                            <span>Start Quiz</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                                <polyline points="12 5 19 12 12 19" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && (
                            <div className="col-12 text-center py-5">
                                <div className="card p-5 bg-transparent border-dashed">
                                    <p className="text-secondary mb-0">No quizzes available currently. Check back later!</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;