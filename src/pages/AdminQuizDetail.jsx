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
                <button className="btn btn-outline-secondary mb-4 d-inline-flex align-items-center gap-2 py-2 px-3" onClick={() => navigate('/admin')} style={{ borderRadius: '20px', fontSize: '0.9rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                    </svg>
                    <span>Back to Dashboard</span>
                </button>
                
                <div className="mb-4">
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', fontWeight: 600 }}>QUIZ BUILDER</span>
                        <span className="badge bg-secondary bg-opacity-20 text-white px-2 py-1 rounded-3 small">{currentQuiz.questions.length} Questions</span>
                    </div>
                    <h2 className="fw-extrabold text-dark mb-2" style={{ letterSpacing: '-0.02em' }}>{currentQuiz.title}</h2>
                    <p className="text-secondary mb-0">{currentQuiz.description || "No description available."}</p>
                </div>
                
                <hr style={{ opacity: 0.15, margin: '2rem 0' }} />

                {/* --- FORM THÊM / SỬA CÂU HỎI --- */}
                <div className="card p-4 p-md-5 mb-5 shadow-lg" style={{ 
                    background: 'rgba(255, 255, 255, 0.45)', 
                    borderColor: isEditing ? 'rgba(245, 158, 11, 0.25) !important' : 'rgba(16, 185, 129, 0.25) !important'
                }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className={`fw-bold m-0 d-flex align-items-center ${isEditing ? "text-warning" : "text-success"}`}>
                            <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                {isEditing ? (
                                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                ) : (
                                    <path d="M12 5v14M5 12h14" />
                                )}
                            </svg>
                            {isEditing ? `Edit Question Details` : 'Add New Question'}
                        </h4>
                        {isEditing && (
                            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 py-1.5 px-2.5" onClick={resetForm} style={{ borderRadius: '20px', fontSize: '0.8rem' }}>
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Question text</label>
                            <input 
                                className="form-control" 
                                placeholder="Enter the question description here (e.g. Which keyword defines a constant?)"
                                value={text} 
                                onChange={e=>setText(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="row g-3 mb-3">
                            {[opt1, opt2, opt3, opt4].map((opt, idx) => (
                                <div className="col-md-6" key={idx}>
                                    <label className="form-label small text-secondary">Option {idx+1}</label>
                                    <input 
                                        className="form-control" 
                                        placeholder={`Option ${idx+1} value`} 
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
                        <div className="mb-4">
                            <label className="form-label fw-bold">Select Correct Answer</label>
                            <select className="form-select" value={correctIndex} onChange={e=>setCorrectIndex(e.target.value)}>
                                <option value={0}>Option 1</option>
                                <option value={1}>Option 2</option>
                                <option value={2}>Option 3</option>
                                <option value={3}>Option 4</option>
                            </select>
                        </div>
                        <button type="submit" className={`btn ${isEditing ? 'btn-primary' : 'btn-success'} w-100 py-2.5 fw-bold`}>
                            {isEditing ? 'Update Question' : 'Add Question'}
                        </button>
                    </form>
                </div>

                {/* --- DANH SÁCH CÂU HỎI --- */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h4 className="fw-bold m-0 d-flex align-items-center">
                        <svg className="me-2 text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                        Questions List
                    </h4>
                    <span className="text-secondary small fw-medium">{currentQuiz.questions.length} Questions Total</span>
                </div>

                {currentQuiz.questions.length === 0 && (
                    <div className="text-center py-5 card bg-transparent border-dashed">
                        <p className="text-muted m-0">No questions added yet. Use the form above to add questions!</p>
                    </div>
                )}
                
                {currentQuiz.questions.map((q, index) => (
                    <div key={q._id} className="card mb-4 shadow-md overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="card-header d-flex justify-content-between align-items-center py-3" style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <span className="fw-bold text-primary small uppercase" style={{ letterSpacing: '0.05em' }}>Question {index + 1}</span>
                            <div className="d-flex gap-2">
                                <button 
                                    className="btn btn-sm btn-secondary d-flex align-items-center py-1.5 px-2.5" 
                                    style={{ fontSize: '0.75rem', color: '#a5f3fc', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.05)' }}
                                    onClick={() => handleEditClick(q)}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)'; e.currentTarget.style.color = '#a5f3fc'; }}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-sm btn-danger d-flex align-items-center py-1.5 px-2.5" 
                                    style={{ fontSize: '0.75rem' }}
                                    onClick={() => dispatch(deleteQuestion(q._id))}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-4">
                            <h5 className="fw-bold text-dark mb-3" style={{ fontSize: '1.15rem' }}>{q.text}</h5>
                            
                            <ul className="list-group list-group-flush border-0">
                                {q.options.map((opt, i) => {
                                    const isCorrect = i === q.correctAnswerIndex;
                                    return (
                                        <li key={i} className="list-group-item bg-transparent border-0 px-0 py-2.5 d-flex align-items-center justify-content-between" style={{
                                            color: isCorrect ? 'var(--success)' : 'var(--text-secondary)',
                                            fontWeight: isCorrect ? '600' : '400',
                                            fontSize: '0.92rem'
                                        }}>
                                            <div className="d-flex align-items-center">
                                                <span className="d-inline-flex align-items-center justify-content-center me-3 rounded-circle" style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    fontSize: '0.75rem',
                                                    background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 0, 0, 0.03)',
                                                    color: isCorrect ? 'var(--success)' : 'var(--text-muted)',
                                                    border: isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(0, 0, 0, 0.03)'
                                                }}>
                                                    {i + 1}
                                                </span>
                                                <span>{opt}</span>
                                            </div>
                                            {isCorrect && (
                                                <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-20 px-2 py-1 rounded-pill small fw-semibold" style={{ fontSize: '0.7rem' }}>
                                                    Correct Answer
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminQuizDetail;