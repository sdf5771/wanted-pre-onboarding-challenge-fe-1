import React, {useState, useEffect} from 'react';
import styles from '../../../stylesheets/route/mainApp/TodoApp.module.css';
import TodoElement from "../../todo/TodoElement";
import {getUserInfomation, setAuthToken, setUserInformation} from "../../../modules/auth/authValidation";
import PublicMessageBox from "../../public/PublicMessageBox";

type todoDataType = {
    title: string,
    content: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
}

function TodoApp(){
    const [todoInputVal, setTodoInputVal] = useState('');
    const [todos, setTodos] = useState<todoDataType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const absorptionTodoData = (newData: todoDataType) => {
        let newTodoData: todoDataType[] = [...todos,newData];
        return newTodoData
    }

    const createTodo = async () => {
        let userInfo = await getUserInfomation();

        if(userInfo){
            let todoData = {
                title : 'no title',
                content : todoInputVal,
            }
            fetch('http://localhost:8080/todos', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': userInfo['token'],
                },
                body: JSON.stringify(todoData),
            }).then((response) => {
                console.log('response ', response);
                if(response.ok){
                    return response.json();
                }
                setIsLoading(false);
                throw new Error('Network response was not ok.');
            }).then((data) => {
                console.log('성공 ', data);
                if(data){
                    let newTodos: todoDataType[] = absorptionTodoData(data.data);
                    if(newTodos && Array.isArray(newTodos)){
                        setTodos(newTodos);
                        setTodoInputVal('');
                    }
                }
                setIsLoading(false);
            }).catch((error) => {
                console.error('실패 : ', error);
                PublicMessageBox('할 일을 생성하지 못했어요.');
                setIsLoading(false);
            })
        }
    }

    const todoInputOnKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter' && !isLoading){
            if(todoInputVal !== ''){
                setIsLoading(true);
                createTodo();
            } else {
                PublicMessageBox('생성할 할 일의 내용을 입력해주세요.');
            }
        }
    }

    return(
        <div className={styles.todo_main_root}>
            <div className={styles.todo_main_title_container}>
                <span><b>할 일</b>을 관리해보세요!</span>
            </div>
            <div className={styles.todo_main_body}>
                { Array.isArray(todos) ? todos.map((todo, index) => {
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
                    <input onKeyDown={todoInputOnKeyDownHandler} onChange={todoInputOnChangeHandler} maxLength={30} placeholder="할 일을 추가해보세요." value={todoInputVal}/>
                </div>
            </div>
        </div>
    );
}

export default TodoApp;
