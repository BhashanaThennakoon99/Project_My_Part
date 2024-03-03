import { SET_USER } from "../constants/ActionTypes";
export const SetUserAction = (payload) => {
    return {
        type: SET_USER,
        data: payload
    }
}