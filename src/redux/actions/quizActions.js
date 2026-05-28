import axios from 'axios';
import { toast } from '../../utils/toast';

// 1. Lấy tất cả Quiz
export const getAllQuizzes = () => async (dispatch) => {
    try {
        dispatch({ type: 'GET_QUIZZES_REQUEST' });
        const { data } = await axios.get('/quizzes');
        dispatch({ type: 'GET_QUIZZES_SUCCESS', payload: data });
    } catch (error) {
        dispatch({
            type: 'GET_QUIZZES_FAIL',
            payload: error.response?.data?.message || error.message
        });
    }
};

// 2. Lấy chi tiết 1 Quiz
export const getQuizById = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_QUIZ_DETAIL_REQUEST' });
        const { data } = await axios.get(`/quizzes/${id}`);
        dispatch({ type: 'GET_QUIZ_DETAIL_SUCCESS', payload: data });
    } catch (error) {
        dispatch({
            type: 'GET_QUIZ_DETAIL_FAIL',
            payload: error.response?.data?.message || error.message
        });
    }
};

// 3. Tạo Quiz mới
export const createQuiz = (quizData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.post('/quizzes', quizData, config);

        dispatch({
            type: 'CREATE_QUIZ_SUCCESS',
            payload: data.quiz
        });
        toast.success("Quiz created successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Create failed");
    }
};

// 4. Xóa Quiz
export const deleteQuiz = (id) => async (dispatch) => {
    const confirmed = await toast.confirm("Are you sure? This will delete all questions in this quiz.");
    if (!confirmed) return;
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        await axios.delete(`/quizzes/${id}`, config);

        dispatch({ type: 'DELETE_QUIZ_SUCCESS', payload: id });
        toast.success("Quiz deleted successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Delete failed");
    }
};

// 5. Cập nhật Quiz (Sửa tên/mô tả)
export const updateQuiz = (id, quizData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.put(`/quizzes/${id}`, quizData, config);

        dispatch({
            type: 'UPDATE_QUIZ_SUCCESS',
            payload: data.quiz
        });
        toast.success("Quiz updated successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Update failed");
    }
};

// 6. Tạo câu hỏi
export const createQuestion = (quizId, questionData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.post(`/quizzes/${quizId}/question`, questionData, config);
        
        dispatch({ type: 'CREATE_QUESTION_SUCCESS', payload: data.question });
        toast.success("Question added successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Add question failed");
    }
};

// 7. Xóa câu hỏi
export const deleteQuestion = (questionId) => async (dispatch) => {
    const confirmed = await toast.confirm("Are you sure you want to delete this question?");
    if (!confirmed) return;
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        await axios.delete(`/questions/${questionId}`, config);

        dispatch({ type: 'DELETE_QUESTION_SUCCESS', payload: questionId });
        toast.success("Question deleted successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Delete question failed");
    }
};

// 8. Cập nhật câu hỏi (MỚI)
export const updateQuestion = (questionId, questionData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = await axios.put(`/questions/${questionId}`, questionData, config);

        dispatch({
            type: 'UPDATE_QUESTION_SUCCESS',
            payload: data.question
        });
        toast.success("Question updated successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Update question failed");
    }
};