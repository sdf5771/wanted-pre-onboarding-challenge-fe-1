type currentStateType = {
    isError: boolean,
}

type actionType = {
    type: string,
}

function authPasswordInputErrorReducer(currentState: currentStateType, action: actionType){
    if(currentState === undefined){
        return {isError: true}
    }

    const newState = {...currentState};

    switch(action.type){

        case 'passwordError':
            newState.isError = true;
            break;
        case 'passwordNotError':
            newState.isError = false;
            break;
    }

    return newState;
}

export default authPasswordInputErrorReducer;
