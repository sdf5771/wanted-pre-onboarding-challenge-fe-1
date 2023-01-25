import React, {useState, useEffect} from 'react';
import styles from '../../../stylesheets/route/mainApp/TodoApp.module.css';
import { useQuery, useMutation } from 'react-query';
import TodoElement from "../../todo/TodoElement";
import {getUserInformation, setAuthToken, setUserInformation} from "../../../modules/auth/authValidation";
import PublicMessageBox from "../../public/PublicMessageBox";
import {getTodos} from "../../../queries/todo/GetTodos";
import {createTodo} from "../../../queries/todo/CreateTodo";

type todoDataType = {
    title: string,
    content: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
}

function TodoApp(){
    const {isLoading: getTodosIsLoading, error, data: getTodosData, refetch: getTodosRefetch} = useQuery('getTodoData', getTodos);
    const { data: createTodoData, isLoading: createTodoIsLoading, mutate: createTodoMutate, mutateAsync } = useMutation(createTodo);
    const [todoInputVal, setTodoInputVal] = useState('');
    const [todos, setTodos] = useState<todoDataType[]>([]);
    const todoInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoInputVal(event.target.value);
    }

    const absorptionTodoData = (newData: todoDataType) => {
        let newTodoData: todoDataType[] = [...todos,newData];
        return newTodoData
    }

    const todoInputOnKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter' && !createTodoIsLoading){
            if(todoInputVal !== ''){
                let todoData = {
                    title : 'no title',
                    content : todoInputVal,
                }
                createTodoMutate(todoData, {
                    onSuccess: (data, variables, context) => {
                        getTodosRefetch();
                        setTodoInputVal('');
                    },
                    onError: (data, variables, context) => {
                        console.error(data);
                    }
                })
            } else {
                PublicMessageBox('생성할 할 일의 내용을 입력해주세요.');
            }
        }
    }
    if(!getTodosData){
        return(
            <div className={styles.todo_main_root}>
                <div className={styles.todo_main_title_container}>
                    <span><b>할 일</b>을 관리해보세요!</span>
                </div>
                <div className={styles.todo_main_body}>
                    { null }
                </div>
                <div className={styles.todo_main_create_container}>
                    <div className={styles.todo_main_create_div}>
                        <input onKeyDown={todoInputOnKeyDownHandler} onChange={todoInputOnChangeHandler} maxLength={50} placeholder="할 일을 추가해보세요." value={todoInputVal}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className={styles.todo_main_root}>
                <div className={styles.todo_main_title_container}>
                    <span><b>할 일</b>을 관리해보세요!</span>
                </div>
                <div className={styles.todo_main_body}>
                    { Array.isArray(getTodosData.data) ? getTodosData.data.map((todo: todoDataType, index: number) => {
                        console.log('todo ', todo);
                        if(todo){
                            return <TodoElement
                                key={todo['id']}
                                title={todo['title']}
                                content={todo['content']}
                                id={todo['id']}
                                createdAt={todo['createdAt']}
                                updatedAt={todo['updatedAt']} />
                        }
                    }) : null}
                </div>
                <div className={styles.todo_main_create_container}>
                    <div className={styles.todo_main_create_div}>
                        <input onKeyDown={todoInputOnKeyDownHandler} onChange={todoInputOnChangeHandler} maxLength={50} placeholder="할 일을 추가해보세요." value={todoInputVal}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoApp;
