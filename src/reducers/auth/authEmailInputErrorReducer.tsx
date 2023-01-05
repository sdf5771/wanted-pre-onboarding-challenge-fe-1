type currentStateType = {
    isError: boolean,
}

type actionType = {
    type: string,
}

function authEmailInputErrorReducer(currentState: currentStateType, action: actionType){
    if(currentState === undefined){
        return {isError: true}
    }

    const newState = {...currentState};

    switch(action.type){
        case 'emailError':
            newState.isError = true;
            break;
        case 'emailNotError':
            newState.isError = false;
            break;
    }

    return newState;
}


export default authEmailInputErrorReducer;
