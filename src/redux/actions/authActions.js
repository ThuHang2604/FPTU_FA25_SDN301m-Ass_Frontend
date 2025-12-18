import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        // Gọi API login (nhờ Proxy nên chỉ cần gõ /auth/login)
        const { data } = await axios.post('/auth/login', { username, password }, config);

        // Tạo object user để lưu trữ
        const userData = { username, admin: data.admin, token: data.token };

        // Lưu vào localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: userData
        });
    } catch (error) {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
};

export const register = (username, password, admin) => async () => { 
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        await axios.post('/auth/signup', { username, password, admin }, config);
        
        return Promise.resolve();
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return Promise.reject(message);
    }
};