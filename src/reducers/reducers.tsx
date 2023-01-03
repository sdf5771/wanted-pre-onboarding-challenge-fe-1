import {combineReducers} from "redux";
// import authReducer from './auth/authReducer';
// import todoReducer from './todo/todoReducer';
import authSlideMenuReducer from './auth/authSlideMenuReducer';

const rootReducer = combineReducers({
    // todoReducer,
    // authReducer,
    authSlideMenuReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
