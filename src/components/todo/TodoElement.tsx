import React from 'react';
import styles from '../../stylesheets/route/todo/TodoElement.module.css'

type TodoElementType = {
    title: string,
    content: string,
    id: string,
    createdAt: Date,
    updateAt: Date,
}
//{title, content, id, createdAt, updateAt} : TodoElementType
function TodoElement(){
    return(
        <div className={styles.todo_element_root}>
            <div className={styles.todo_element_title}>

            </div>
            <div className={styles.todo_element_body}>
                <div className={styles.todo_element_content_container}>
                    <span>할 일 내용</span>
                </div>
                <div className={styles.todo_element_date_container}>
                    <span>생성일 : </span>
                    <span>수정일 : </span>
                </div>
            </div>
            <div className={styles.todo_btn_container}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default TodoElement;
