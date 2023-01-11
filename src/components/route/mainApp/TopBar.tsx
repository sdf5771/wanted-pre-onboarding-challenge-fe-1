import React, {useEffect, useState} from 'react';
import styles from '../../../stylesheets/route/mainApp/TopBar.module.css';
import {getUserInformation, removeAuthData} from "../../../modules/auth/authValidation";
import PublicMessageBox from "../../public/PublicMessageBox";

function TopBar(){
    const [email, setEmail] = useState('');
    const setEmailTopBar = () => {
        let userResult = getUserInformation();

        if(userResult && userResult.success){
            setEmail(userResult['email'] as string);
        }
    }
    useEffect(() => {
        setEmailTopBar();
    },[])

    const onLogOutClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        let removeResult = removeAuthData();

        if(removeResult && removeResult.success){
            PublicMessageBox('로그아웃이 완료되었습니다.');

            setTimeout(() => {
                window.location.href = '/';
            }, 300)
        }
    }

    const todoAppTitleOnClickHandler = (event: React.MouseEvent) => {
        window.location.href = '/';
    }

    return (
        <div className={styles.top_bar_root}>
            <div onClick={todoAppTitleOnClickHandler} className={styles.top_bar_title_container}>
                <span>Todo App</span>
            </div>

            <div className={styles.top_bar_userinfo_container}>
                <div className={styles.top_bar_user}>
                    <span>{email + ' 님 오늘은 무엇을 할까요?'} </span>
                </div>
                <div className={styles.logout_btn} onClick={onLogOutClickHandler}>
                    <span>LogOut</span>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
