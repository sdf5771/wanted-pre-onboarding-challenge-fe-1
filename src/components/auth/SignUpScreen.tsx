import React, {useState, useEffect, useRef} from 'react';
import styles from '../../stylesheets/components/auth/SignUpScreen.module.css';
import AuthInputForwardedRefComponent from "./AuthInputComponent";
import PublicStyleButton from "../public/PublicStyleButton";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "../../reducers/reducers";
import PublicMessageBox from "../public/PublicMessageBox";

function SignUpScreen(){
    const joinUsRootRef = useRef<HTMLDivElement>(null);
    const loginPageClickDispatch = useDispatch();
    const emailAuthInputRef = useRef<HTMLInputElement>(null);
    const passwordAuthInputRef = useRef<HTMLInputElement>(null);
    const inputEmailErrorState = useSelector((state: RootState) => state.authEmailInputErrorReducer);
    const inputPasswordErrorState = useSelector((state: RootState) => state.authPasswordInputErrorReducer);

    const loginPageSwitchHandler = () => {
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
                PublicMessageBox('?????? ???????????? ???????????????.');
                throw new Error('Network response was not ok.');
            }).then((data) => {
                console.log('?????? ', data);
                if(data.message === '????????? ??????????????? ?????????????????????'){
                    loginPageSwitchHandler();

                    PublicMessageBox('??????????????? ????????????????????? ????????? ????????????.');
                } else {
                    PublicMessageBox('??????????????? ?????????????????? ??????????????? ??????????????????.');
                }
            }).catch((error) => {
                console.error('?????? : ', error);
            })
        }
    }

    const joinUsOnClick = async() => {
        if(inputEmailErrorState && inputPasswordErrorState){
            if(inputEmailErrorState['isError'] && inputPasswordErrorState['isError']){
                PublicMessageBox('???????????? ??????????????? ??????????????????.');
            }  else {
                if(inputEmailErrorState['isError']){
                    PublicMessageBox('???????????? ??????????????????.');
                } else if(inputPasswordErrorState['isError']){
                    PublicMessageBox('??????????????? ??????????????????.');
                } else {
                    await SignUpFetch();
                }
            }
        }
    }

    const loginPageBtnOnClickEvent = () => {
        loginPageSwitchHandler();
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
