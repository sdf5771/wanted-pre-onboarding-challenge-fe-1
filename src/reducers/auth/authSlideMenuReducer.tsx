type currentStateType = {
    isClick: boolean,
}

type actionType = {
    type: string,
}

function authSlideMenuReducer(currentState: currentStateType, action: actionType){
    if(currentState === undefined){
        return {isClick: false}
    }
    const newState = {...currentState};

    if(action.type === 'join us click'){
        newState.isClick = true;
    } else if(action.type === 'login click'){
        newState.isClick = false;
    }

    return newState;
}

export default authSlideMenuReducer;
