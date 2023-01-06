import {combineReducers} from "redux";
// import authReducer from './auth/authReducer';
// import todoReducer from './todo/todoReducer';
import authSlideMenuReducer from './auth/authSlideMenuReducer';
import authEmailInputErrorReducer from './auth/authEmailInputErrorReducer';
import authPasswordInputErrorReducer from './auth/authPasswordInputErrorReducer';
import todoDetailViewReducer from "./todo/todoDetailViewClickReducer";

const rootReducer = combineReducers({
    // todoReducer,
    // authReducer,
    authSlideMenuReducer,
    authEmailInputErrorReducer,
    authPasswordInputErrorReducer,
    todoDetailViewReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
