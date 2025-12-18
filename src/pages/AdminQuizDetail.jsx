import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Import thêm updateQuestion
import { getQuizById, createQuestion, deleteQuestion, updateQuestion } from '../redux/actions/quizActions';
import Navbar from '../components/Navbar';

const AdminQuizDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentQuiz, loading } = useSelector((state) => state.quiz);

    // State cho form
    const [text, setText] = useState('');
    const [opt1, setOpt1] = useState('');
    const [opt2, setOpt2] = useState('');
    const [opt3, setOpt3] = useState('');
    const [opt4, setOpt4] = useState('');
    const [correctIndex, setCorrectIndex] = useState(0);

    // State quản lý chế độ Sửa
    const [isEditing, setIsEditing] = useState(false);
    const [currentQId, setCurrentQId] = useState(null);

    useEffect(() => {
        dispatch(getQuizById(id));
    }, [dispatch, id]);

    // Xử lý Submit Form (Dùng chung cho cả Thêm và Sửa)
    const handleSubmit = (e) => {
        e.preventDefault();
        const questionData = {
            text,
            options: [opt1, opt2, opt3, opt4],
            correctAnswerIndex: Number(correctIndex)
        };

        if (isEditing) {
            // Logic Sửa
            dispatch(updateQuestion(currentQId, questionData));
            // Reset chế độ
            setIsEditing(false);
            setCurrentQId(null);
        } else {
            // Logic Thêm
            dispatch(createQuestion(id, questionData));
        }

        // Reset form về rỗng
        resetForm();
    };

    const resetForm = () => {
        setText(''); setOpt1(''); setOpt2(''); setOpt3(''); setOpt4(''); setCorrectIndex(0);
        setIsEditing(false);
        setCurrentQId(null);
    };

    // Đổ dữ liệu câu hỏi lên form khi bấm nút Edit
    const handleEditClick = (q) => {
        setText(q.text);
        setOpt1(q.options[0] || '');
        setOpt2(q.options[1] || '');
        setOpt3(q.options[2] || '');
        setOpt4(q.options[3] || '');
        setCorrectIndex(q.correctAnswerIndex);
        
        setIsEditing(true);
        setCurrentQId(q._id);
        
        // Cuộn trang lên đầu để thấy form
        window.scrollTo(0, 0);
    };

    if (loading || !currentQuiz) return <div className="spinner-border m-5"></div>;

    return (
        <>
            <Navbar />
            <div className="container pb-5">
                <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/admin')}>&larr; Back to Dashboard</button>
                <h2 className="text-primary mb-2">Manager: {currentQuiz.title}</h2>
                <p className="text-muted">{currentQuiz.description}</p>
                <hr />

                {/* --- FORM THÊM / SỬA CÂU HỎI --- */}
                <div className="card p-4 mb-5 shadow-sm border-primary" style={{backgroundColor: '#f8f9fa'}}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className={isEditing ? "text-warning" : "text-success"}>
                            {isEditing ? `Edit Question` : 'Add New Question'}
                        </h4>
                        {isEditing && <button className="btn btn-secondary btn-sm" onClick={resetForm}>Cancel Edit</button>}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label className="form-label fw-bold">Question Text</label>
                            <input className="form-control" value={text} onChange={e=>setText(e.target.value)} required />
                        </div>
                        <div className="row">
                            {[opt1, opt2, opt3, opt4].map((opt, idx) => (
                                <div className="col-md-6 mb-2" key={idx}>
                                    <input 
                                        className="form-control" 
                                        placeholder={`Option ${idx+1}`} 
                                        value={idx===0?opt1:idx===1?opt2:idx===2?opt3:opt4} 
                                        onChange={e => {
                                            if(idx===0) setOpt1(e.target.value);
                                            else if(idx===1) setOpt2(e.target.value);
                                            else if(idx===2) setOpt3(e.target.value);
                                            else setOpt4(e.target.value);
                                        }}
                                        required 
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Correct Answer</label>
                            <select className="form-select" value={correctIndex} onChange={e=>setCorrectIndex(e.target.value)}>
                                <option value={0}>Option 1</option>
                                <option value={1}>Option 2</option>
                                <option value={2}>Option 3</option>
                                <option value={3}>Option 4</option>
                            </select>
                        </div>
                        <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-success'} w-100`}>
                            {isEditing ? 'Update Question' : 'Add Question'}
                        </button>
                    </form>
                </div>

                {/* --- DANH SÁCH CÂU HỎI --- */}
                <h4>Questions List ({currentQuiz.questions.length})</h4>
                {currentQuiz.questions.length === 0 && <p className="text-muted">No questions yet.</p>}
                
                {currentQuiz.questions.map((q, index) => (
                    <div key={q._id} className="card mb-3 border-secondary shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center bg-white">
                            <strong>Question {index + 1}</strong>
                            <div>
                                <button 
                                    className="btn btn-sm btn-info me-2 text-white" 
                                    onClick={() => handleEditClick(q)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-sm btn-danger" 
                                    onClick={() => dispatch(deleteQuestion(q._id))}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{q.text}</h5>
                            <ul className="list-group list-group-flush">
                                {q.options.map((opt, i) => (
                                    <li key={i} className={`list-group-item ${i === q.correctAnswerIndex ? "list-group-item-success fw-bold" : ""}`}>
                                        {opt} {i === q.correctAnswerIndex && "(Correct)"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminQuizDetail;