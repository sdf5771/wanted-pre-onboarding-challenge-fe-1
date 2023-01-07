import React, {useState, useEffect} from 'react';
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
    const [titleState, setTitleState] = useState(title);
    const [contentState, setContentState] = useState(content);
    const [idState, setIdState] = useState(id);
    const [createdAtState, setCreatedAtState] = useState(createdAt);
    const [updatedAtState, setUpdatedAtState] = useState(updatedAt);

    const todoDetailDataRequest = async () => {
        let userInfo = await getUserInfomation();
        let todoId = idState;
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
                    todoDetailViewClickReducerDispatch(
                        {type: 'TodoDetailView Open',
                            todoData: {title: titleState,
                                content: contentState,
                                id: idState,
                                createdAt: createdAtState,
                                updatedAt: updatedAtState}})
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

    const todoEditRequest = async (updateContent: string) => {
        let userInfo = await getUserInfomation();
        let todoId = idState;
        if(userInfo){
            let editData = {
                title: 'no title',
                content: updateContent,
            }
            fetch(`http://localhost:8080/todos/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': userInfo['token'],
                },
                body: JSON.stringify(editData),
            }).then((response) => {
                console.log('response ', response);
                if(response.ok){
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            }).then((data) => {
                setContentState(data['data']['content']);
                setUpdatedAtState(data['data']['updatedAt']);
            }).catch((error) => {
                console.error('실패 : ', error);
                PublicMessageBox('할 일을 수정하지 못했어요.');
            })
        }
    }

    const todoEditBtnOnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        let userInput = prompt('수정할 할 일 내용을 입력해주세요.', contentState)
        console.log('userInput ', userInput);
        if(userInput){
            if(userInput !== contentState){
                todoEditRequest(userInput);
            } else {
                PublicMessageBox('수정할 할 일의 내용은 전과 동일할 수 없습니다.');
            }
        }
    }

    const todoDeleteRequest = async () => {
        let userInfo = await getUserInfomation();
        let todoId = idState;
        if(userInfo){
            fetch(`http://localhost:8080/todos/${todoId}`, {
                method: 'DELETE',
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
                console.log('성공 : ', data);
            }).catch((error) => {
                console.error('실패 : ', error);
                PublicMessageBox('할 일을 삭제하지 못했어요.');
            })
        }
    }

    const todoRemoveBtnOnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        let userConfirm : boolean = window.confirm("정말 해당 할 일을 삭제하시겠어요?");

        if(userConfirm){
            todoDeleteRequest();
        }
    }

    return(
        <div onClick={todoElementOnClickHandler} className={styles.todo_element_root}>
            <div className={styles.todo_element_title}>
                <div className={styles.todo_star_img}></div>
            </div>
            <div className={styles.todo_element_body}>
                <div className={styles.todo_element_content_container}>
                    <span>{contentState}</span>
                </div>
                <div className={styles.todo_element_date_container}>
                    <span>{'생성일 : ' + new Date(createdAtState).toLocaleString()}</span>
                    <span>{'수정일 : ' + new Date(updatedAtState).toLocaleString()}</span>
                </div>
            </div>
            <div className={styles.todo_btn_container}>
                <div onClick={todoEditBtnOnClickHandler} className={styles.edit_btn}></div>
                <div onClick={todoRemoveBtnOnClickHandler} className={styles.remove_btn}></div>
            </div>
        </div>
    );
}

export default TodoElement;
