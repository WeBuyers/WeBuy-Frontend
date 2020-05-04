import {createStore} from "redux"
import {loginReducer} from "./reducers/LoginReducer"
const store = createStore(loginReducer);
export default store