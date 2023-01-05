import React, {useEffect} from 'react';
import TodoScreen from '../todo/TodoScreen';
import {getAuthToken} from "../../modules/auth/authValidation";

function MainApp(){
    const loginAuthCheck = () => {
        let loginToken = getAuthToken();

        if(loginToken && !loginToken.isToken){
            window.location.href = '/auth';
        }
    }

    useEffect(() => {
        loginAuthCheck();
    })
    return (
        <div>
            <h1>MainApp</h1>
        </div>
    );
}

export default MainApp;
