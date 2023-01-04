import React, {useState, forwardRef} from 'react';
import styles from '../../stylesheets/components/auth/AuthInputComponent.module.css';
import { emailInputValidation } from '../../modules/auth/authValidation';

type AuthInputComponentType = {
    inputType: string,
    inputLabel: string,
}

function AuthInputComponent({inputType, inputLabel}: AuthInputComponentType, ref: React.ForwardedRef<HTMLInputElement>){
    const [inputVal, setInputVal] = useState('');
    const [isError, setIsError] = useState(false);

    let errorAddHtml = ``;
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event){
            if(inputType === 'email'){
                let validationResult = emailInputValidation(inputVal);
                console.log('validationResult ', validationResult);
                if(validationResult.isValid){
                    errorAddHtml = '';
                    setIsError(false);
                } else {
                    errorAddHtml = `<div className={styles.error_container}><span>{validationResult.message}</span></div>`
                    setIsError(true);
                    console.log('asda');
                }
            } else if(inputType === 'password'){

            }

            setInputVal(event.target.value);
        }
    }

    return (
        <div className={styles.auth_input_component_root}>
            <input ref={ref} className={styles.auth_input} type={inputType} onChange={onChangeHandler} value={inputVal} required/>
            <span className={styles.auth_txt_area}></span>
            <label className={styles.auth_input_header_label}>{inputLabel}</label>
            {isError ? errorAddHtml : null}
        </div>
    );
}
const AuthInputForwardedRefComponent = forwardRef(AuthInputComponent);

export default AuthInputForwardedRefComponent;
