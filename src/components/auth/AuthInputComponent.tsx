import React, {useState} from 'react';
import styles from '../../stylesheets/components/auth/AuthInputComponent.module.css';

type AuthInputComponentType = {
    inputType: string,
    inputLabel: string,
}

function AuthInputComponent({inputType, inputLabel}: AuthInputComponentType){
    const [inputVal, setInputVal] = useState('');

    return (
        <div className={styles.auth_input_component_root}>
            <input className={styles.auth_input} type={inputType} onChange={(event)=>setInputVal(event.target.value)} value={inputVal} required/>
            <span className={styles.auth_txt_area}></span>
            <label className={styles.auth_input_header_label}>{inputLabel}</label>
        </div>
    );
}

export default AuthInputComponent;
