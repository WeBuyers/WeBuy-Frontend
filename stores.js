import {createStore, combineReducers} from "redux"
import {loginReducer} from "./reducers/LoginReducer"
import {wishlistReducer} from "./reducers/WishlistReducer"
const rootReducer = combineReducers({login: loginReducer, wishlist: wishlistReducer});
const store = createStore(rootReducer);
export default store