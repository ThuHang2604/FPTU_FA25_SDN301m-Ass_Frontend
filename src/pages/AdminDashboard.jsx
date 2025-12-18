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
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-danger">Admin Dashboard</h2>
                    <button 
                        className="btn btn-success" 
                        onClick={toggleForm}
                    >
                        {showForm ? 'Cancel' : '+ Create New Quiz'}
                    </button>
                </div>

                {/* Form Tạo/Sửa Quiz */}
                {showForm && (
                    <div className="card p-3 mb-4 shadow-sm bg-light">
                        <h5 className="text-primary">{isEditing ? 'Edit Quiz' : 'New Quiz'}</h5>
                        <form onSubmit={handleSubmit}>
                            <input 
                                className="form-control mb-2" 
                                placeholder="Quiz Title" 
                                value={title} 
                                onChange={e=>setTitle(e.target.value)} 
                                required 
                            />
                            <input 
                                className="form-control mb-2" 
                                placeholder="Description" 
                                value={desc} 
                                onChange={e=>setDesc(e.target.value)} 
                            />
                            <button type="submit" className="btn btn-primary btn-sm">
                                {isEditing ? 'Update Quiz' : 'Save Quiz'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Danh sách Quiz */}
                {loading ? <div className="spinner-border"></div> : (
                    <table className="table table-striped table-bordered shadow-sm bg-white">
                        <thead className="table-dark">
                            <tr>
                                <th>Quiz Title</th>
                                <th>Description</th>
                                <th style={{width: '300px'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map((quiz) => (
                                <tr key={quiz._id}>
                                    <td>{quiz.title}</td>
                                    <td>{quiz.description}</td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-info me-2 text-white"
                                            onClick={() => handleEditClick(quiz)}
                                        >
                                            Edit Info
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => navigate(`/admin/quiz/${quiz._id}`)}
                                        >
                                            Questions
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => dispatch(deleteQuiz(quiz._id))}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default AdminDashboard;