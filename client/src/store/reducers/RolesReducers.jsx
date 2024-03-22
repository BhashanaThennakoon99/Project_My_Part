// RolesReducers.jsx

import {
    ADD_ROLE,
    EDIT_ROLE,
    DELETE_ROLE,
    SELECT_ROLE,
  } from '../actions/ActionTypes';
  
  const initialState = {
    roles: [],
    selectedRoleId: null,
  };
  
  const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ROLE:
        return {
          ...state,
          roles: [...state.roles, action.payload],
        };
      case EDIT_ROLE:
        return {
          ...state,
          roles: state.roles.map((role) =>
            role.id === action.payload.roleId ? action.payload.updatedData : role
          ),
        };
      case DELETE_ROLE:
        return {
          ...state,
          roles: state.roles.filter((role) => role.id !== action.payload),
        };
      case SELECT_ROLE:
        return {
          ...state,
          selectedRoleId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rolesReducer;
  