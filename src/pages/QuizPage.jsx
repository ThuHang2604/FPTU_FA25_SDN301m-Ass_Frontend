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

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
    if (!currentQuiz || !currentQuiz.questions || currentQuiz.questions.length === 0) {
        return (
            <>
                <Navbar />
                <div className="container text-center mt-5">
                    <h3>Quiz not found or has no questions.</h3>
                    <button className="btn btn-secondary mt-3" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="card shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
                    <div className="card-body p-5">
                        {showScore ? (
                            // Giao diện Kết quả
                            <div className="text-center">
                                <h2 className="mb-4">Quiz Completed!</h2>
                                <h4 className="mb-4">Your score: <span className="text-primary">{score}</span> / {currentQuiz.questions.length}</h4>
                                <div className="d-flex justify-content-center gap-3">
                                    <button className="btn btn-primary btn-lg" onClick={handleRestart}>Restart Quiz</button>
                                    <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/dashboard')}>Back to Home</button>
                                </div>
                            </div>
                        ) : (
                            // Giao diện Câu hỏi
                            <div>
                                <h2 className="text-center mb-4">Quiz</h2>
                                <div className="mb-4">
                                    <h5>Question {currentQuestionIndex + 1}/{currentQuiz.questions.length}</h5>
                                    <h3 className="fw-bold mt-3">{currentQuiz.questions[currentQuestionIndex].text}</h3>
                                </div>

                                <div className="list-group mb-4">
                                    {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`list-group-item list-group-item-action ${selectedOption === index ? 'active' : ''}`}
                                            onClick={() => setSelectedOption(index)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    className="btn btn-primary w-100 py-2" 
                                    onClick={handleAnswerSubmit}
                                    disabled={selectedOption === null}
                                >
                                    {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
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