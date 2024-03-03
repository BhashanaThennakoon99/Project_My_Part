import { MiddlewareArray, configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import SetUserReducer from "../reducers/SetUserReducer";
const rootReducer = combineReducers({
    SetUserReducer,

})
const Store = configureStore(
    {
        reducer: rootReducer,
        middleware: new MiddlewareArray()
    }
);

export default Store;