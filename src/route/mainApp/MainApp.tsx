import React, {useEffect} from 'react';
import TodoScreen from '../todo/TodoScreen';
import styles from '../../stylesheets/route/mainApp/MainApp.module.css';
import {getAuthToken} from "../../modules/auth/authValidation";
import TopBar from '../../components/route/mainApp/TopBar';
import TodoApp from "../../components/route/mainApp/TodoApp";

function MainApp(){
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
        </div>
    );
}

export default MainApp;
