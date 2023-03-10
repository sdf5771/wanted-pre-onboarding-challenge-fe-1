import {getUserInformation} from "../../modules/auth/authValidation";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getTodos = async () => {
    let userInfo = getUserInformation();
    const response = await fetch(BASE_URL + '/todos', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': userInfo['token'] as string,
        },
    })

    return response.json();
}
