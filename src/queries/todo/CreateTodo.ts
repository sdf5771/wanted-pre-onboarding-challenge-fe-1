import {getUserInformation} from "../../modules/auth/authValidation";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createTodo = async (todoData: object) => {
    let userInfo = getUserInformation();

    const response = await fetch(BASE_URL + '/todos',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': userInfo['token'] as string,
        },
        body: JSON.stringify(todoData),
    })

    return response.json();
}
