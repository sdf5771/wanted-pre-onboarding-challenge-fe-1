type currentStateType = {
    isClick: boolean,
    todoData: object,
}

type actionType = {
    type: string,
    todoData: object,
}

function todoDeleteReducer(currentState: currentStateType, action: actionType){
    if(currentState === undefined){
        return {isClick: false, todoData: {}}
    }
    const newState = {...currentState};

    if(action.type === 'todoDeleteReducer Delete'){
        newState.isClick = true;
        newState.todoData = action.todoData;
    }

    return newState;
}

export default todoDeleteReducer;
