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
//
// export const passwordInputValidation = (value: string) => {
//     let validationResult = {
//         isValid: false,
//         message: '',
//     }
//
//     if(passwordInputRef && passwordInputRef.current){
//
//
//     }
//
//     return validationResult
// }
