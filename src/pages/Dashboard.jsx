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
            <div className="container">
                <h2 className="mb-4">Available Quizzes</h2>
                
                {loading && <div className="spinner-border text-primary" role="status"></div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row">
                    {quizzes && quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <div key={quiz._id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{quiz.title}</h5>
                                        <p className="card-text text-muted">
                                            {quiz.description || "No description available."}
                                        </p>
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/quiz/${quiz._id}`)} // <--- Xử lý chuyển trang
                                        >
                                            Start Quiz
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p className="text-muted">No quizzes available currently.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;