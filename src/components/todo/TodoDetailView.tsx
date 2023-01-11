import React, {useEffect, useState} from 'react';
import styles from '../../stylesheets/route/todo/TodoDetailView.module.css';
import {useDispatch} from "react-redux";
import {getUserInformation} from "../../modules/auth/authValidation";

type TodoDetailViewType = {
    title: string,
    content: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
}

function TodoDetailView ({title, content, id, createdAt, updatedAt} : TodoDetailViewType) {
    const todoDetailViewClickReducerDispatch = useDispatch();
    const [user, setUser] = useState('');
    const todoDetailViewCloseOnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        todoDetailViewClickReducerDispatch({type: 'TodoDetailView Close'});
    }

    const getUserInfo = () => {
        let userInfo = getUserInformation();

        if(userInfo){
            setUser(userInfo['email'] as string);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return(
        <div id='todoDetailViewRoot'>
            <div className={styles.todo_detail_view_background}></div>
            <div className={styles.todo_detail_view_root}>
                <div className={styles.todo_detail_view_header}>
                    <div className={styles.todo_img_div}></div>
                    <div className={styles.todo_detail_view_title}><span>할 일 상세보기</span></div>
                    <div onClick={todoDetailViewCloseOnClickHandler} className={styles.close_img}></div>
                </div>
                <div className={styles.todo_detail_view_body}>
                    <div className={styles.todo_content_title}><span>{'할 일 제목 : ' + title}</span></div>
                    <div className={styles.todo_content_creator}><span>{'작성자 : ' + user}</span></div>
                    <div className={styles.todo_content_createdAt}><span>{'생성일 : ' + new Date(createdAt).toLocaleString()}</span></div>
                    <div className={styles.todo_content_updatedAt}><span>{'마감일 : ' + new Date(updatedAt).toLocaleString()}</span></div>
                    <div className={styles.todo_content_content}><span>{' - ' + content}</span></div>
                </div>
            </div>
        </div>
    );
}

export default TodoDetailView;
