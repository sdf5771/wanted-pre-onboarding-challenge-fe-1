import React, {useState} from 'react';
import styles from '../../../stylesheets/route/mainApp/TodoApp.module.css';
import TodoElement from "../../todo/TodoElement";

function TodoApp(){
    const [todoInputVal, setTodoInputVal] = useState('');

    const todoInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoInputVal(event.target.value);
    }

    return(
        <div className={styles.todo_main_root}>
            <div className={styles.todo_main_title_container}>
                <span><b>할 일</b>을 관리해보세요!</span>
            </div>
            <div className={styles.todo_main_body}>
                <TodoElement />
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
