import React, {useState} from 'react';
import styles from '../../../stylesheets/route/mainApp/TodoApp.module.css';

function TodoApp(){
    return(
        <div className={styles.todo_main_root}>
            <div className={styles.todo_main_title_container}>
                <span><b>할 일</b>을 관리해보세요!</span>
            </div>
            <div className={styles.todo_main_body}>

            </div>
            <div className={styles.todo_main_create_container}>
                <div className={styles.todo_main_create_div}>
                    <input maxLength={30} placeholder="할 일을 추가해보세요."/>
                </div>
            </div>
        </div>
    );
}

export default TodoApp;
