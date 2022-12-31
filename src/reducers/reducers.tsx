import {combineReducers} from "redux";
import authReducer from './auth/authReducer';
import todoReducer from './todo/todoReducer';

const rootReducer = combineReducers({
    todoReducer,
    authReducer,
});

export default rootReducer;
