import React from "react";

export const emailInputValidation = (value: string) => {
    let validationResult = {
        isValid: false,
        message: '올바른 이메일 형식이 아닙니다.',
    }
    let regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(value){
        let regexResult = regex.test(value);

        if (regexResult){
            validationResult.isValid = true;
            validationResult.message = '';
        } else {
            validationResult.isValid = false;
            validationResult.message = '올바른 이메일 형식이 아닙니다.';
        }
    }

    return validationResult
}

export const passwordInputValidation = (value: string) => {
    let validationResult = {
        isValid: false,
        message: '',
    }
    let regex = /(?=.*\d)(?=.*[a-z]).{8,}/; // 영어 소문자, 숫자 포함 8자 이상의 비밀번호
    if(value){
        let regexResult = regex.test(value);

        if (regexResult){
            validationResult.isValid = true;
            validationResult.message = '';
        } else {
            validationResult.isValid = false;
            validationResult.message = '올바른 비밀번호 형식이 아닙니다.';
        }
    }

    return validationResult
}

export const getAuthToken = () => {
    let getAuthTokenResult = {
        isToken: false,
    }

    let userAuthResult = localStorage.getItem('token');

    if(userAuthResult){
        getAuthTokenResult.isToken = true;
    } else {
        getAuthTokenResult.isToken = false;
    }

    return getAuthTokenResult;
}

export const setAuthToken = (token: string) => {
    let setAuthTokenResult = {
        success: false,
    }

    if(token){
        localStorage.setItem('token', token);
        setAuthTokenResult.success = true;
    }

    return setAuthTokenResult;
}

export const setUserInformation = (email: string) => {
    let setUserInfoResult = {
        success: false,
    }

    if(email){
        localStorage.setItem('email', email);
        setUserInfoResult.success = true;
    }

    return setUserInfoResult;
}

export const getUserInfomation = async () => {
    let getUserInfoResult = {
        success: false,
        email: '',
        token: '',
    }
    let emailResult = await localStorage.getItem('email');
    let tokenResult = await localStorage.getItem('token');

    if(emailResult && tokenResult){
        getUserInfoResult.email = emailResult;
        getUserInfoResult.token = tokenResult;
        getUserInfoResult.success = true;
    }

    return getUserInfoResult;
}

export const removeAuthData = async() => {
    let removeResult = {
        success: false,
    }

    await localStorage.removeItem("email");
    await localStorage.removeItem("token");

    removeResult.success = true;
    return removeResult
}
