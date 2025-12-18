const initialState = {
    quizzes: [],
    loading: false,
    error: null,
    currentQuiz: null
};

export const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_QUIZZES_REQUEST':
        case 'GET_QUIZ_DETAIL_REQUEST':
            return { ...state, loading: true };

        case 'GET_QUIZZES_SUCCESS':
            return { ...state, loading: false, quizzes: action.payload };

        case 'GET_QUIZ_DETAIL_SUCCESS':
            return { ...state, loading: false, currentQuiz: action.payload };

        case 'CREATE_QUIZ_SUCCESS':
            return { 
                ...state, 
                quizzes: [...state.quizzes, action.payload] 
            };

        case 'UPDATE_QUIZ_SUCCESS':
            return {
                ...state,
                quizzes: state.quizzes.map(q => 
                    q._id === action.payload._id ? action.payload : q
                )
            };

        case 'DELETE_QUIZ_SUCCESS':
            return {
                ...state,
                quizzes: state.quizzes.filter(q => q._id !== action.payload)
            };

        case 'CREATE_QUESTION_SUCCESS':
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    questions: [...state.currentQuiz.questions, action.payload]
                }
            };

        case 'DELETE_QUESTION_SUCCESS':
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    questions: state.currentQuiz.questions.filter(q => q._id !== action.payload)
                }
            };

        // Case mới: Update câu hỏi
        case 'UPDATE_QUESTION_SUCCESS':
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    questions: state.currentQuiz.questions.map(q => 
                        q._id === action.payload._id ? action.payload : q
                    )
                }
            };

        case 'GET_QUIZZES_FAIL':
        case 'GET_QUIZ_DETAIL_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};