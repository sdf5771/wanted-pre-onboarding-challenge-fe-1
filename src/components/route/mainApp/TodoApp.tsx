import React, {useState, useEffect} from 'react';
import styles from '../../../stylesheets/route/mainApp/TodoApp.module.css';
import TodoElement from "../../todo/TodoElement";
import {getUserInfomation, setAuthToken, setUserInformation} from "../../../modules/auth/authValidation";
import PublicMessageBox from "../../public/PublicMessageBox";

function TodoApp(){
    const [todoInputVal, setTodoInputVal] = useState('');
    const [todos, setTodos] = useState([]);

    const getTodoList = async() => {
        let userInfo = await getUserInfomation();
        if(userInfo){
            fetch('http://localhost:8080/todos', {
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
                    setTodos(data.data);
                    console.log('todos ', todos);
                }
            }).catch((error) => {
                console.error('실패 : ', error);
                PublicMessageBox('할 일을 불러오지 못했어요.');
            })
        }
    }

    useEffect(() => {
        getTodoList();
    }, [])

    const todoInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoInputVal(event.target.value);
    }

    return(
        <div className={styles.todo_main_root}>
            <div className={styles.todo_main_title_container}>
                <span><b>할 일</b>을 관리해보세요!</span>
            </div>
            <div className={styles.todo_main_body}>
                { Array.isArray(todos) ? todos.map((todo, index) => {
                    console.log('todo ', todo);
                    return <TodoElement />
                }) : null}
            </div>
            <div className={styles.todo_main_create_container}>
                <div className={styles.todo_main_create_div}>
                    <input onChange={todoInputOnChangeHandler} maxLength={30} placeholder="할 일을 추가해보세요." value={todoInputVal}/>
                </div>
            </div>
        </div>
    );
}

export default TodoApp;
