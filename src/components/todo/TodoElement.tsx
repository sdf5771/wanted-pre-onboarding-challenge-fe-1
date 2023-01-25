import React, {useState, useEffect, useRef} from 'react';
import styles from '../../stylesheets/route/todo/TodoElement.module.css'
import {getUserInformation} from "../../modules/auth/authValidation";
import PublicMessageBox from "../public/PublicMessageBox";
import {useDispatch} from "react-redux";
import { useQuery,useMutation } from "react-query";
import {updateTodo} from "../../queries/todo/UpdateTodo";
import {deleteTodo} from "../../queries/todo/DeleteTodo";
import {getDetailTodoData} from "../../queries/todo/GetDetailTodoData";

type TodoElementType = {
    title: string,
    content: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
}

function TodoElement({title, content, id, createdAt, updatedAt} : TodoElementType){
    const todoDetailViewClickReducerDispatch = useDispatch();
    const { data: updateTodoData, isLoading: updateTodoIsLoading, mutate: updateTodoMutate } = useMutation(updateTodo);
    const { data: deleteTodoData, isLoading: deleteTodoIsLoading, mutate: deleteTodoMutate } = useMutation(deleteTodo);
    const {isLoading: detailTodoIsLoading, error: detailTodoError, data: detailTodoData} = useQuery('getDetailTodo', () => getDetailTodoData(id));
    const [contentState, setContentState] = useState(content);
    const [updatedAtState, setUpdatedAtState] = useState(updatedAt);

    const todoElementRef = useRef<HTMLDivElement>(null);

    const todoElementOnClickHandler = async (event: React.MouseEvent<HTMLDivElement>) => {
        if(detailTodoError){
            console.error('실패 : ', detailTodoError);
            PublicMessageBox('할 일을 불러오지 못했어요.');
        } else {
            if(detailTodoData && detailTodoData.data){
                todoDetailViewClickReducerDispatch(
                    {type: 'TodoDetailView Open',
                        todoData: {title: detailTodoData.data.title,
                            content: detailTodoData.data.content,
                            id: detailTodoData.data.id,
                            createdAt: detailTodoData.data.createdAt,
                            updatedAt: detailTodoData.data.updatedAt}})
            }
        }
    }

    const todoEditBtnOnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        let userInput = prompt('수정할 할 일 내용을 입력해주세요.', contentState)
        console.log('userInput ', userInput);
        if(userInput){
            if(userInput !== contentState){
                let editData = {
                    title: 'no title',
                    content: userInput,
                    todoId: id,
                }
                updateTodoMutate(editData,{
                    onSuccess: (data) => {
                        setContentState(data['data']['content']);
                        setUpdatedAtState(data['data']['updatedAt']);
                    },
                    onError: (data) => {
                        console.error('실패 : ', data);
                        PublicMessageBox('할 일을 수정하지 못했어요.');
                    }
                });
            } else {
                PublicMessageBox('수정할 할 일의 내용은 전과 동일할 수 없습니다.');
            }
        }
    }

    const todoRemoveBtnOnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        let userConfirm : boolean = window.confirm("정말 해당 할 일을 삭제하시겠어요?");

        if(userConfirm){
            deleteTodoMutate(id, {
                onSuccess: (data) => {
                    console.log('성공 : ', data);
                },
                onError: (data) => {
                    console.error('실패 : ', data);
                    PublicMessageBox('할 일을 삭제하지 못했어요.');
                }
            });
        }
    }

    return(
        <div ref={todoElementRef} onClick={todoElementOnClickHandler} className={styles.todo_element_root}>
            <div className={styles.todo_element_title}>
                <div className={styles.todo_star_img}></div>
            </div>
            <div className={styles.todo_element_body}>
                <div className={styles.todo_element_content_container}>
                    <span>{contentState}</span>
                </div>
                <div className={styles.todo_element_date_container}>
                    <span>{'생성일 : ' + new Date(createdAt).toLocaleString()}</span>
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
