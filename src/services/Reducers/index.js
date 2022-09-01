import todo_List from "../Reducers/reducers";
import { combineReducers } from "redux"


let rootReducers = combineReducers({
    todo_List,
});



export default rootReducers;