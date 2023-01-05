import React, {useEffect, useState} from 'react';
import styles from '../../../stylesheets/route/mainApp/TopBar.module.css';
import {getUserInfomation, removeAuthData} from "../../../modules/auth/authValidation";
import PublicMessageBox from "../../public/PublicMessageBox";

function TopBar(){

    // let userResult = getUserInfomation();

    // if(userResult && userResult.success){
    //     setUserEmail(userResult['email']);
    // }

    const onLogOutClickHandler = async (event: React.MouseEvent<HTMLDivElement>) => {
        let removeResult = await removeAuthData();

        if(removeResult && removeResult.success){
            PublicMessageBox('로그아웃이 완료되었습니다.');

            setTimeout(() => {
                window.location.href = '/';
            }, 300)
        }
    }

    return (
        <div className={styles.top_bar_root}>
            <div className={styles.top_bar_title_container}>
                <span>Todo App</span>
            </div>

            <div className={styles.top_bar_userinfo_container}>
                <div className={styles.top_bar_user}>
                    <span> 님 오늘은 무엇을 할까요? </span>
                </div>
                <div className={styles.logout_btn} onClick={onLogOutClickHandler}>
                    <span>LogOut</span>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
