import { Add_Todo, Delete_Todo, Update_Todo } from "../constant"

let initialData = {
    list:[
        { id:"7794566", data:"to list 1" },
        { id:"775235566", data:"to list 2" },
    ]
}

let todo_List = (state = initialData, action) => {
    switch(action.type) {
        case Add_Todo:
            let { id, data } = action.payload;
            return {
                list:[
                    ...state.list,
                    {
                        id:id,
                        data:data,
                    }
                ]
            }
        case Delete_Todo:

            let newTodos = state.list.filter((todo) => todo.id !== action.payload.id)
            return {
                ...state.list,
                list: newTodos
            }
        
        case Update_Todo:

            let updatedTodo = state.list.map((item) => {
                if(item.id === action.payload.id){
                    return { ...item, data:action.payload.data}
                }
                return item;
            })

            return {
                ...state,
                list:updatedTodo
            }; 

        default: return state;
    }
}


export default todo_List;