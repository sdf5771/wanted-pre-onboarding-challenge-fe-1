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
