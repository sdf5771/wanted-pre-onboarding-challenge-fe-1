import React, {useState, useEffect, useRef} from 'react';
import styles from '../../stylesheets/components/auth/LoginScreen.module.css';
import AuthInputComponent from '../../components/auth/AuthInputComponent';
import PublicStyleButton from "../public/PublicStyleButton";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../reducers/reducers';

function LoginScreen(){
    const loginRootRef = useRef<HTMLDivElement>(null);
    let loginRootRefCurrent : unknown;
    const joinUsClickDispatch = useDispatch();

    useEffect(() => {
        loginRootRefCurrent = loginRootRef.current
    }, [])

    const loginFetch = async () => {
        let loginData = {}

        fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(loginData),
        }).then((response) => {
            console.log('response ', response);
            if(response.ok){
                return response.json();
            }
            throw new Error('Newwork response was not ok.');
        }).then((data) => {
            console.log('성공 ', data);
            if(data.message === '성공적으로 로그인 했습니다'){

            } else {

            }
        }).catch((error) => {
            console.error('실패 : ', error);
        })
    }

    const loginBtnOnClickEvent = (event : React.MouseEvent<HTMLDivElement>) => {

    }

    const joinUsBtnOnClickEvent = (event : React.MouseEvent) => {
        if(loginRootRef.current){
            loginRootRef.current.animate({
                // right:['0', '500px'],
                opacity:['1', '0'],
            },{
                duration: 300,
                easing: "ease",
                iterations: 1,
                fill: "both"
            })
        }
        setTimeout(() => {
            joinUsClickDispatch({ type : 'join us click'})
        }, 300)
    }

    return(
        <div ref={loginRootRef} className={styles.login_screen_root}>
            <div className={styles.login_screen_header}>
                <span> Login </span>
            </div>

            <div className={styles.login_screen_body}>
                <AuthInputComponent inputType='email' inputLabel='Email' />
                <AuthInputComponent inputType='password' inputLabel='Password' />
                <div>
                    <PublicStyleButton buttonText='Login' buttonImgSrc="" onClickEvent={loginBtnOnClickEvent} />
                </div>
                <div className={styles.login_join_us_container}>
                    <span>Not a member?</span>
                    <span onClick={joinUsBtnOnClickEvent}>Join Us</span>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
