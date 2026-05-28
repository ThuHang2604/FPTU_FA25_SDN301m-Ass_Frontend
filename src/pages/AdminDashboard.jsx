import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuizzes, createQuiz, deleteQuiz, updateQuiz } from '../redux/actions/quizActions';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizzes, loading } = useSelector((state) => state.quiz);

    // Các state quản lý Form
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Đang ở chế độ sửa hay thêm mới
    const [currentId, setCurrentId] = useState(null); // ID của quiz đang được sửa
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        dispatch(getAllQuizzes());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title) return;

        if (isEditing) {
            // Logic Sửa (Update)
            dispatch(updateQuiz(currentId, { title, description: desc }));
            // Sau khi sửa xong thì reset form
            setIsEditing(false);
            setCurrentId(null);
        } else {
            // Logic Tạo mới (Create)
            dispatch(createQuiz({ title, description: desc }));
        }

        // Dọn dẹp form và đóng lại
        setTitle('');
        setDesc('');
        setShowForm(false);
    };

    // Hàm xử lý khi bấm nút "Edit Info"
    const handleEditClick = (quiz) => {
        setTitle(quiz.title);
        setDesc(quiz.description || '');
        setCurrentId(quiz._id);
        setIsEditing(true); // Bật chế độ sửa
        setShowForm(true); // Hiện form lên
    };

    // Hàm xử lý khi bấm nút "Cancel" hoặc "Create New Quiz"
    const toggleForm = () => {
        if (showForm) {
            // Nếu đang mở thì đóng và reset hết
            setShowForm(false);
            setIsEditing(false);
            setTitle('');
            setDesc('');
        } else {
            // Nếu đang đóng thì mở ra ở chế độ tạo mới
            setShowForm(true);
            setIsEditing(false);
            setTitle('');
            setDesc('');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container pb-5">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                    <div>
                        <h2 className="fw-extrabold m-0 text-danger d-flex align-items-center" style={{ letterSpacing: '-0.02em' }}>
                            <svg className="me-2 text-danger" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Admin Dashboard
                        </h2>
                        <p className="text-secondary small m-0 mt-1">Manage and orchestrate all quizzes and questions</p>
                    </div>
                    <button 
                        className={`btn ${showForm ? 'btn-secondary' : 'btn-success'} d-flex align-items-center gap-2`} 
                        onClick={toggleForm}
                    >
                        {showForm ? (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                <span>Cancel</span>
                            </>
                        ) : (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                <span>Create New Quiz</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Form Tạo/Sửa Quiz */}
                {showForm && (
                    <div className="card p-4 mb-4 shadow-sm" style={{ borderColor: 'rgba(99, 102, 241, 0.15) !important', background: 'rgba(255,255,255,0.45)' }}>
                        <h5 className="fw-bold mb-3 text-primary d-flex align-items-center">
                            <svg className="me-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            {isEditing ? 'Edit Quiz Information' : 'Create New Quiz'}
                        </h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Quiz Title</label>
                                    <input 
                                        className="form-control" 
                                        placeholder="Enter quiz title (e.g. JavaScript Advanced)" 
                                        value={title} 
                                        onChange={e=>setTitle(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Description</label>
                                    <input 
                                        className="form-control" 
                                        placeholder="Provide a brief summary of the quiz topic" 
                                        value={desc} 
                                        onChange={e=>setDesc(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-2">
                                <button type="button" className="btn btn-secondary px-4" onClick={toggleForm}>Cancel</button>
                                <button type="submit" className="btn btn-primary px-4">
                                    {isEditing ? 'Update Quiz' : 'Save Quiz'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Danh sách Quiz */}
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border" role="status"></div>
                    </div>
                ) : (
                    <div className="table-container shadow-lg">
                        <div className="table-responsive">
                            <table className="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th>Quiz Title</th>
                                        <th>Description</th>
                                        <th style={{width: '320px'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizzes && quizzes.length > 0 ? (
                                        quizzes.map((quiz) => (
                                            <tr key={quiz._id}>
                                                <td className="fw-bold text-dark" style={{ fontSize: '1rem' }}>{quiz.title}</td>
                                                <td className="text-secondary small">{quiz.description || <span className="text-muted italic">No description.</span>}</td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <button 
                                                            className="btn btn-sm btn-secondary d-flex align-items-center py-1.5 px-2.5"
                                                            style={{ fontSize: '0.8rem', color: '#a5f3fc', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.05)' }}
                                                            onClick={() => handleEditClick(quiz)}
                                                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)'; e.currentTarget.style.color = '#fff'; }}
                                                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)'; e.currentTarget.style.color = '#a5f3fc'; }}
                                                        >
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                            </svg>
                                                            Edit Info
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-secondary d-flex align-items-center py-1.5 px-2.5"
                                                            style={{ fontSize: '0.8rem', color: '#c7d2fe', borderColor: 'rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.05)' }}
                                                            onClick={() => navigate(`/admin/quiz/${quiz._id}`)}
                                                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)'; e.currentTarget.style.color = '#fff'; }}
                                                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'; e.currentTarget.style.color = '#c7d2fe'; }}
                                                        >
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                                                                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                                                                <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                                                            </svg>
                                                            Questions
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-danger d-flex align-items-center py-1.5 px-2.5"
                                                            style={{ fontSize: '0.8rem' }}
                                                            onClick={() => dispatch(deleteQuiz(quiz._id))}
                                                        >
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                                                                <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-muted">No quizzes created yet. Use "+ Create New Quiz" to get started!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminDashboard;