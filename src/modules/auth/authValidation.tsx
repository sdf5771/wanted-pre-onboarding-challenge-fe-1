import React from "react";

export const emailInputValidation = (value: string) => {
    let regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if(value){
        let regexResult = regex.test(value);

        if (regexResult){
            return {
                isValid: true,
                message: '',
            }
        } else {
            return {
                isValid: false,
                message: '올바른 이메일 형식이 아닙니다.',
            }
        }
    }

    return {
        isValid: false,
        message: '올바른 이메일 형식이 아닙니다.',
    }
}

export const passwordInputValidation = (value: string) => {
    let regex = /(?=.*\d)(?=.*[a-z]).{8,}/; // 영어 소문자, 숫자 포함 8자 이상의 비밀번호

    if(value){
        let regexResult = regex.test(value);

        if (regexResult){
            return {
                isValid: true,
                message: '',
            }
        } else {
            return {
                isValid: false,
                message: '올바른 비밀번호 형식이 아닙니다.',
            }
        }
    }

    return {
        isValid: false,
        message: '',
    }
}

export const getAuthToken = () => {
    let userAuthResult = localStorage.getItem('token');

    if(userAuthResult){
        return {
            isToken: true,
        }
    } else {
        return {
            isToken: false,
        }
    }

    return {
        isToken: false,
    };
}

export const setAuthToken = (token: string) => {
    if(token){
        localStorage.setItem('token', token);
        return {
            success: true,
        }
    }

    return {
        success: false,
    };
}

export const setUserInformation = (email: string) => {
    if(email){
        localStorage.setItem('email', email);
        return {
            success: true,
        };
    }

    return {
        success: false,
    };
}

export const getUserInformation = () => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const conditions = [email, token]

    if(conditions.every(condition => !!condition)){
        return {
            success: true,
            email,
            token,
        }
    }
    return {
        success: false,
        email: '',
        token: '',
    }
}

export const removeAuthData = () => {
    let removeResult = {
        success: false,
    }

    localStorage.removeItem("email");
    localStorage.removeItem("token");

    removeResult.success = true;
    return removeResult
}
