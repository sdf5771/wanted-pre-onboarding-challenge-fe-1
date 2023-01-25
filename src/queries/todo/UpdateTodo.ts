import {getUserInformation} from "../../modules/auth/authValidation";

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface EditDataType{
    title: string,
    content: string,
    todoId: string,
}

export const updateTodo = async(editData: EditDataType) => {
    let userInfo = getUserInformation();

    const response = await fetch(BASE_URL + `/todos/${editData.todoId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': userInfo['token'] as string,
        },
        body: JSON.stringify(editData),
    })

    return response.json()
}
