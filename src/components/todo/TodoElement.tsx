import React from 'react';
import styles from '../../stylesheets/route/todo/TodoElement.module.css'
import {getUserInfomation} from "../../modules/auth/authValidation";
import PublicMessageBox from "../public/PublicMessageBox";
import {useDispatch} from "react-redux";

type TodoElementType = {
    title: string,
    content: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
}

function TodoElement({title, content, id, createdAt, updatedAt} : TodoElementType){
    const todoDetailViewClickReducerDispatch = useDispatch();

    const todoDetailDataRequest = async () => {
        let userInfo = await getUserInfomation();
        let todoId = id;
        if(userInfo){
            fetch(`http://localhost:8080/todos/${todoId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': userInfo['token'],
                },
            }).then((response) => {
                console.log('response ', response);
                if(response.ok){
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            }).then((data) => {
                console.log('성공 ', data);
                if(data){
                    todoDetailViewClickReducerDispatch({type: 'TodoDetailView Open', todoData: {title, content, id, createdAt, updatedAt}})
                }
            }).catch((error) => {
                console.error('실패 : ', error);
                PublicMessageBox('할 일을 불러오지 못했어요.');
            })
        }
    }

    const todoElementOnClickHandler = async (event: React.MouseEvent<HTMLDivElement>) => {
        await todoDetailDataRequest();
    }

    return(
        <div onClick={todoElementOnClickHandler} className={styles.todo_element_root}>
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
