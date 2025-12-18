import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; 
import { authReducer } from './reducers/authReducer'; 
import { quizReducer } from './reducers/quizReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    quiz: quizReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;