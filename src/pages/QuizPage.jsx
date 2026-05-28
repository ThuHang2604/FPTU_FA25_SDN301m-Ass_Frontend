import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizById } from '../redux/actions/quizActions';
import Navbar from '../components/Navbar';

const QuizPage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentQuiz, loading, error } = useSelector((state) => state.quiz);
    
    // State để quản lý quá trình làm bài
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        dispatch(getQuizById(id));
    }, [dispatch, id]);

    // Hàm xử lý khi bấm nút Submit Answer
    const handleAnswerSubmit = () => {
        if (selectedOption === null) return; // Chưa chọn gì thì không làm gì cả

        const currentQuestion = currentQuiz.questions[currentQuestionIndex];
        
        // Kiểm tra đáp án đúng (Backend trả về correctAnswerIndex)
        if (Number(selectedOption) === currentQuestion.correctAnswerIndex) {
            setScore(score + 1);
        }

        // Chuyển sang câu tiếp theo
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < currentQuiz.questions.length) {
            setCurrentQuestionIndex(nextQuestion);
            setSelectedOption(null); // Reset lựa chọn
        } else {
            setShowScore(true); // Nếu hết câu hỏi thì hiện điểm
        }
    };

    // Hàm làm lại từ đầu
    const handleRestart = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setShowScore(false);
        setSelectedOption(null);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                    <p className="text-secondary">Loading quiz details...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'var(--bg-primary)' }}>
                <div className="card p-5 text-center shadow-lg" style={{ maxWidth: '500px' }}>
                    <svg className="text-danger mb-3 mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <h4 className="fw-bold mb-3">Error Occurred</h4>
                    <div className="alert alert-danger">{error}</div>
                    <button className="btn btn-secondary mt-3" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                </div>
            </div>
        );
    }

    if (!currentQuiz || !currentQuiz.questions || currentQuiz.questions.length === 0) {
        return (
            <>
                <Navbar />
                <div className="container text-center mt-5">
                    <div className="card p-5 mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
                        <svg className="text-secondary mb-3 mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        <h3 className="fw-bold mb-3">Quiz Not Found</h3>
                        <p className="text-secondary mb-4">The requested quiz does not exist or has no questions associated with it.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                    </div>
                </div>
            </>
        );
    }

    // Determine performance status and feedback text on results screen
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    let feedbackEmoji = "💪";
    let feedbackTitle = "Keep Practicing!";
    let feedbackClass = "text-warning";
    let feedbackGrad = "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)";
    let feedbackBorder = "rgba(245, 158, 11, 0.2)";
    
    if (percentage >= 80) {
        feedbackEmoji = "🏆";
        feedbackTitle = "Excellent Job!";
        feedbackClass = "text-success";
        feedbackGrad = "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)";
        feedbackBorder = "rgba(16, 185, 129, 0.2)";
    } else if (percentage >= 50) {
        feedbackEmoji = "👍";
        feedbackTitle = "Good Effort!";
        feedbackClass = "text-info";
        feedbackGrad = "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)";
        feedbackBorder = "rgba(59, 130, 246, 0.2)";
    }

    return (
        <>
            <Navbar />
            <div className="container pb-5">
                <div className="card shadow-lg mx-auto" style={{ maxWidth: '750px' }}>
                    <div className="card-body p-4 p-md-5">
                        {showScore ? (
                            // Giao diện Kết quả
                            <div className="text-center py-4">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white bg-opacity-5 p-4 rounded-circle mb-4 border border-white border-opacity-10 shadow-sm" style={{ width: '90px', height: '90px', fontSize: '2.5rem' }}>
                                    {feedbackEmoji}
                                </div>
                                <h2 className="fw-extrabold mb-1" style={{ letterSpacing: '-0.02em' }}>Quiz Completed!</h2>
                                <p className="text-secondary small mb-4">{currentQuiz.title}</p>
                                
                                <div className="p-4 rounded-4 mb-5 border" style={{ 
                                    background: feedbackGrad,
                                    borderColor: feedbackBorder
                                }}>
                                    <h4 className={`fw-bold mb-2 ${feedbackClass}`}>{feedbackTitle}</h4>
                                    <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
                                        <div className="text-center">
                                            <span className="d-block text-secondary small uppercase fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>CORRECT ANSWERS</span>
                                            <span className="fs-3 fw-bold text-dark">{score} <span className="fs-5 text-secondary">/ {currentQuiz.questions.length}</span></span>
                                        </div>
                                        <div style={{ width: '1px', height: '40px', background: 'rgba(0,0,0,0.1)' }}></div>
                                        <div className="text-center">
                                            <span className="d-block text-secondary small uppercase fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>PERCENTAGE</span>
                                            <span className="fs-3 fw-bold text-dark">{percentage}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                    <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2.5 px-4" onClick={handleRestart}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                                        </svg>
                                        <span>Restart Quiz</span>
                                    </button>
                                    <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 py-2.5 px-4" onClick={() => navigate('/dashboard')}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                        <span>Back to Home</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Giao diện Câu hỏi
                            <div>
                                {/* Step Progress Bar */}
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="text-secondary small fw-bold" style={{ letterSpacing: '0.03em' }}>
                                            QUESTION {currentQuestionIndex + 1} OF {currentQuiz.questions.length}
                                        </span>
                                        <span className="badge bg-white bg-opacity-5 border border-white border-opacity-10 text-secondary px-2.5 py-1 rounded-pill small" style={{ fontSize: '0.75rem' }}>
                                            Progress: {Math.round(((currentQuestionIndex) / currentQuiz.questions.length) * 100)}%
                                        </span>
                                    </div>
                                    <div className="progress" style={{ height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
                                        <div 
                                            className="progress-bar" 
                                            role="progressbar" 
                                            style={{ 
                                                width: `${((currentQuestionIndex) / currentQuiz.questions.length) * 100}%`,
                                                background: 'var(--primary-gradient)',
                                                borderRadius: '10px',
                                                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="fw-bold text-dark mt-3 mb-4" style={{ fontSize: '1.45rem', lineHeight: '1.4' }}>
                                        {currentQuiz.questions[currentQuestionIndex].text}
                                    </h3>
                                </div>

                                <div className="options-container mb-4">
                                    {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => {
                                        const letters = ['A', 'B', 'C', 'D'];
                                        return (
                                            <button
                                                key={index}
                                                className={`quiz-option-btn ${selectedOption === index ? 'active' : ''}`}
                                                onClick={() => setSelectedOption(index)}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <span className="d-inline-flex align-items-center justify-content-center me-3 rounded-circle fw-bold" style={{
                                                        width: '28px',
                                                        height: '28px',
                                                        fontSize: '0.85rem',
                                                        background: selectedOption === index ? 'var(--primary)' : 'rgba(0, 0, 0, 0.04)',
                                                        color: selectedOption === index ? '#fff' : 'var(--text-secondary)',
                                                        border: '1px solid rgba(0, 0, 0, 0.05)',
                                                        transition: 'all 0.2s ease'
                                                    }}>
                                                        {letters[index] || index + 1}
                                                    </span>
                                                    <span>{option}</span>
                                                </div>
                                                {selectedOption === index && (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button 
                                    className="btn btn-primary w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 mt-4" 
                                    onClick={handleAnswerSubmit}
                                    disabled={selectedOption === null}
                                >
                                    <span>{currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizPage;