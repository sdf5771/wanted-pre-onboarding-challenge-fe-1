import {getUserInformation} from "../../modules/auth/authValidation";

const BASE_URL = 'http://localhost:8080/todos'

export const getTodos = async () => {
    let userInfo = getUserInformation();
    const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': userInfo['token'] as string,
        },
    })

    return response.json();
}
