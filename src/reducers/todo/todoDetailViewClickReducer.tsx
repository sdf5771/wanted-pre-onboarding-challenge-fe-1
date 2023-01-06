type currentStateType = {
    isClick: boolean,
    todoData: object,
}

type actionType = {
    type: string,
    todoData: object,
}

function todoDetailView(currentState: currentStateType, action: actionType){
    if(currentState === undefined){
        return {isClick: false, todoData: {}}
    }
    const newState = {...currentState};

    if(action.type === 'TodoDetailView Open'){
        newState.isClick = true;
        newState.todoData = action.todoData;
    } else if(action.type === 'TodoDetailView Close'){
        newState.isClick = false;
        newState.todoData = {};
    }

    return newState;
}

export default todoDetailView;
