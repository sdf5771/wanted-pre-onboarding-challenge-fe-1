import React, {useEffect} from 'react';
import TodoScreen from '../todo/TodoScreen';
import styles from '../../stylesheets/route/mainApp/MainApp.module.css';
import {getAuthToken} from "../../modules/auth/authValidation";
import TopBar from '../../components/route/mainApp/TopBar';
import TodoApp from "../../components/route/mainApp/TodoApp";
import TodoDetailView from '../../components/todo/TodoDetailView';
import {useSelector} from "react-redux";
import {RootState} from '../../reducers/reducers';

function MainApp(){
    const todoDetailViewClick = useSelector((state: RootState) => state.todoDetailViewReducer);
    const loginAuthCheck = () => {
        let loginToken = getAuthToken();

        if(loginToken && !loginToken.isToken){
            window.location.href = '/auth';
        }
    }

    useEffect( () => {
        loginAuthCheck();
    }, [])

    return (
        <div className={styles.app_root}>
            <TopBar />
            <div className={styles.app_body}>
                <TodoApp />
            </div>
            {todoDetailViewClick['isClick'] ?
                <TodoDetailView
                    title={todoDetailViewClick['todoData']['title']}
                    content={todoDetailViewClick['todoData']['content']}
                    id={todoDetailViewClick['todoData']['id']}
                    createdAt={todoDetailViewClick['todoData']['createdAt']}
                    updatedAt={todoDetailViewClick['todoData']['updatedAt']}
                />
                 : null}
        </div>
    );
}

export default MainApp;
