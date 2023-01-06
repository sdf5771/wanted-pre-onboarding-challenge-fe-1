import React from 'react';
import styles from '../../stylesheets/route/todo/TodoElement.module.css'

type TodoElementType = {
    title: string,
    content: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
}

function TodoElement({title, content, id, createdAt, updatedAt} : TodoElementType){
    return(
        <div className={styles.todo_element_root}>
            <div className={styles.todo_element_title}>
                <div className={styles.todo_star_img}></div>
            </div>
            <div className={styles.todo_element_body}>
                <div className={styles.todo_element_content_container}>
                    <span>{content}</span>
                </div>
                <div className={styles.todo_element_date_container}>
                    <span>{'생성일 : ' + new Date(createdAt).toLocaleString()}</span>
                    <span>{'수정일 : ' + new Date(updatedAt).toLocaleString()}</span>
                </div>
            </div>
            <div className={styles.todo_btn_container}>
                <div className={styles.edit_btn}></div>
                <div className={styles.remove_btn}></div>
            </div>
        </div>
    );
}

export default TodoElement;
