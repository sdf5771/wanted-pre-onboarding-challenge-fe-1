import React from 'react';
import styles from '../../stylesheets/components/auth/LoginScreen.module.css';
import AuthInputComponent from '../../components/auth/AuthInputComponent';

function LoginScreen(){

    return(
        <div className={styles.login_screen_root}>
            <div className={styles.login_screen_header}>
                <span> Login </span>
            </div>

            <div className={styles.login_screen_body}>
                <AuthInputComponent inputType='email' inputLabel='Email' />
                <AuthInputComponent inputType='password' inputLabel='Password' />
            </div>
        </div>
    );
}

export default LoginScreen;
