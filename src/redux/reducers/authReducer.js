// Kiểm tra xem trong localStorage có lưu user chưa (để khi F5 không bị mất đăng nhập)
const userFromStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null;

const initialState = {
    user: userFromStorage,
    isAuthenticated: !!userFromStorage, // Nếu có user thì là true
    loading: false,
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case 'LOGIN_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};