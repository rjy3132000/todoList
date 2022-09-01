import { Add_Todo, Delete_Todo, Update_Todo } from "../constant";


export let AddTodo = (data) => {
    return {
        type:Add_Todo,
        payload: {
            id: new Date().getTime().toString(),
            data : data,
        }

    }
}

export let DeleteTodo = (id) => {
    return {
        type:Delete_Todo,
        payload:{
            id: id,
        }
    }
}

export let UpdateTodo = (id,data)=> {
    return {
        type:Update_Todo,
        payload:{
            id: id,
            data:data,
        }
    }
}
