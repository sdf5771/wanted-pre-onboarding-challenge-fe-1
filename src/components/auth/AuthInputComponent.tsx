import React, {useState, forwardRef} from 'react';
import styles from '../../stylesheets/components/auth/AuthInputComponent.module.css';
import {emailInputValidation, passwordInputValidation} from '../../modules/auth/authValidation';
import {useDispatch} from "react-redux";

type AuthInputComponentType = {
    inputType: string,
    inputLabel: string,
}

function AuthInputComponent({inputType, inputLabel}: AuthInputComponentType, ref: React.ForwardedRef<HTMLInputElement>){
    const [inputVal, setInputVal] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const ErrorReducerDispatch = useDispatch();

    let errorAddHtml = `<div style="position: absolute; bottom: -20px;display: flex; width: 100%"><span style="font-size: 0.8rem; color: red;">${errorMsg}</span></div>`;

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event){
            if(inputType === 'email'){
                let validationResult = emailInputValidation(inputVal);
                console.log('email ', validationResult);
                if(validationResult.isValid){
                    setErrorMsg('');
                    setIsError(false);
                    ErrorReducerDispatch({type: 'emailNotError'});
                } else {
                    setErrorMsg(validationResult.message);
                    setIsError(true);
                    ErrorReducerDispatch({type: 'emailError'});
                }
            } else if(inputType === 'password'){
                let validationResult = passwordInputValidation(inputVal);
                console.log('password ', validationResult);
                if(validationResult.isValid){
                    setErrorMsg('');
                    setIsError(false);
                    ErrorReducerDispatch({type: 'passwordNotError'});
                } else {
                    setErrorMsg(validationResult.message);
                    setIsError(true);
                    ErrorReducerDispatch({type: 'passwordError'});
                }
            }

            //set input value
            setInputVal(event.target.value);
        }
    }

    const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        if(event && event.target.value === ''){
            setErrorMsg('');
        }
    }

    return (
        <div className={styles.auth_input_component_root}>
            <input ref={ref} className={styles.auth_input} type={inputType === 'email' ? 'text' : 'password'} onChange={onChangeHandler} onBlur={onBlurHandler} value={inputVal} required/>
            <span className={styles.auth_txt_area}></span>
            <label className={styles.auth_input_header_label}>{inputLabel}</label>
            {isError ? <div dangerouslySetInnerHTML={{__html: errorAddHtml}}></div> : null}
        </div>
    );
}
const AuthInputForwardedRefComponent = forwardRef(AuthInputComponent);

export default AuthInputForwardedRefComponent;
