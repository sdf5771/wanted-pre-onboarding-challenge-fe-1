import {getUserInformation} from "../../modules/auth/authValidation";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const deleteTodo = async(todoId: string) => {
    let userInfo = getUserInformation();

    const response = await fetch(BASE_URL + `/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': userInfo['token'] as string,
        },
    })

    return response.json();
}
