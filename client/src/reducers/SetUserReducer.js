import { SET_USER } from "../constants/ActionTypes";
const initialState = {
    user: "null",
}
const SetUserReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        
        case SET_USER:
            return {
                //counter:getFromDatabase(),
                ...state,
                user: action.data
            }
        default: return state
    }

}

export default SetUserReducer;