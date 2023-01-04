import React, {useState, useEffect, useRef} from 'react';
import styles from '../../stylesheets/components/auth/SignUpScreen.module.css';
import AuthInputForwardedRefComponent from "./AuthInputComponent";
import PublicStyleButton from "../public/PublicStyleButton";
import { useSelector, useDispatch } from 'react-redux';

function SignUpScreen(){
    const joinUsRootRef = useRef<HTMLDivElement>(null);
    const loginPageClickDispatch = useDispatch();
    const emailAuthInputRef = useRef<HTMLInputElement>(null);
    const passwordAuthInputRef = useRef<HTMLInputElement>(null);

    const SignUpFetch = async () => {
        if(emailAuthInputRef.current && passwordAuthInputRef.current){
            let signUpData = {
                email: emailAuthInputRef.current['value'],
                password: passwordAuthInputRef.current['value'],
            }
            console.log('signUpData ', signUpData);
            fetch('http://localhost:8080/users/create', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(signUpData),
            }).then((response) => {
                console.log('response ', response);
                if(response.ok){
                    return response.json();
                }
                throw new Error('Newwork response was not ok.');
            }).then((data) => {
                console.log('성공 ', data);
                if(data.message === '계정이 성공적으로 생성되었습니다'){

                } else {

                }
            }).catch((error) => {
                console.error('실패 : ', error);
            })
        }
    }

    const joinUsOnClick = async() => {
        await SignUpFetch();
    }

    const loginPageBtnOnClickEvent = () => {
        if(joinUsRootRef.current){
            joinUsRootRef.current.animate({
                opacity:['1', '0'],
            },{
                duration: 300,
                easing: "ease",
                iterations: 1,
                fill: "both"
            })
        }
        setTimeout( () => {
            loginPageClickDispatch({type: 'login click'});
        },300)
    }

    return(
        <div ref={joinUsRootRef} className={styles.join_us_screen_root}>
            <div className={styles.join_us_screen_header}>
                <span> Sign Up </span>
            </div>

            <div className={styles.join_us_screen_body}>
                <AuthInputForwardedRefComponent ref={emailAuthInputRef} inputType='email' inputLabel='Email' />
                <AuthInputForwardedRefComponent ref={passwordAuthInputRef} inputType='password' inputLabel='Password' />
                <div>
                    <PublicStyleButton buttonText='Sign Up' buttonImgSrc="" onClickEvent={joinUsOnClick} />
                </div>
                <div className={styles.join_us_login_container}>
                    <span>Return </span>
                    <span onClick={loginPageBtnOnClickEvent}>Login Page</span>
                </div>
            </div>
        </div>
    );
}

export default SignUpScreen;
