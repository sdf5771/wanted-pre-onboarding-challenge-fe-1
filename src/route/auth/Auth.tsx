import React from 'react';
import styles from '../../stylesheets/route/auth/Auth.module.css';
import LoginScreen from '../../components/auth/LoginScreen';
import SignUpScreen from '../../components/auth/SignUpScreen';

function Auth(){
    return(
        <div className={styles.auth_root}>
            <div className={styles.auth_body}>
                <div className={styles.auth_title_container}>
                    <div className={styles.auth_title_header}>
                        <span>Todo Application</span>
                    </div>
                    <div className={styles.auth_title_body}>
                        <div className={styles.todo_img}></div>
                        <span>Wanted - OnBoarding Front-end Challenge</span>
                        <div className={styles.float_body}>
                            <span>Developer Seobisback</span>
                        </div>
                    </div>
                </div>
                <div className={styles.authorization_container}>
                    <LoginScreen />
                </div>
            </div>
        </div>
    );
}

export default Auth;
