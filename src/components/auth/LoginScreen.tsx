import React, {useState, useEffect, useRef} from 'react';
import styles from '../../stylesheets/components/auth/LoginScreen.module.css';
import AuthInputComponent from '../../components/auth/AuthInputComponent';
import PublicStyleButton from "../public/PublicStyleButton";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../reducers/reducers';
import PublicMessageBox from '../../components/public/PublicMessageBox';
import {setAuthToken} from "../../modules/auth/authValidation";

function LoginScreen(){
    const loginRootRef = useRef<HTMLDivElement>(null);
    let loginRootRefCurrent : unknown;
    const joinUsClickDispatch = useDispatch();
    const emailAuthInputRef = useRef<HTMLInputElement>(null);
    const passwordAuthInputRef = useRef<HTMLInputElement>(null);
    const inputEmailErrorState = useSelector((state: RootState) => state.authEmailInputErrorReducer);
    const inputPasswordErrorState = useSelector((state: RootState) => state.authPasswordInputErrorReducer);

    useEffect(() => {
        loginRootRefCurrent = loginRootRef.current
    }, [])

    const loginFetch = async () => {
        if(emailAuthInputRef.current && passwordAuthInputRef.current){
            let loginData = {
                email: emailAuthInputRef.current['value'],
                password: passwordAuthInputRef.current['value'],
            }

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
                throw new Error('Network response was not ok.');
            }).then((data) => {
                console.log('성공 ', data);
                if(data.message === '성공적으로 로그인 했습니다'){
                    setAuthToken(data.token);

                    PublicMessageBox('로그인 되었습니다.');

                    setTimeout(() => {
                        window.location.href = '/';
                    }, 400)
                } else {
                    PublicMessageBox('계정이 가입되어있는지 확인해주세요.');
                }
            }).catch((error) => {
                console.error('실패 : ', error);
                PublicMessageBox('로그인을 하는데 서버와 통신에 문제가 생겼습니다 관리자에게 문의해주세요.');
            })
        }
    }

    const loginBtnOnClickEvent = async (event : React.MouseEvent<HTMLDivElement>) => {
        if(inputEmailErrorState && inputPasswordErrorState){
            if(inputEmailErrorState['isError'] && inputPasswordErrorState['isError']){
                PublicMessageBox('아이디와 비밀번호를 확인해주세요.');
            } else if(inputEmailErrorState['isError'] && !inputPasswordErrorState['isError']){
                PublicMessageBox('아이디와 확인해주세요.');
            } else if(!inputEmailErrorState['isError'] && inputPasswordErrorState['isError']){
                PublicMessageBox('비밀번호를 확인해주세요.');
            } else {
                await loginFetch();
            }
        }
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
                <AuthInputComponent ref={emailAuthInputRef} inputType='email' inputLabel='Email' />
                <AuthInputComponent ref={passwordAuthInputRef} inputType='password' inputLabel='Password' />
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
