// RoleActions.jsx

import axios from 'axios';
import {
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  SELECT_ROLE,
} from './ActionTypes';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles';

export const fetchRoles = () => {
    // Implementation of fetchRoles function
  };

  export const updateRole = (roleId, newData) => {
    // Implementation of updateRole function
  };
  

export const addRole = (roleData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}${ROLE_URL}`, roleData);
    dispatch({ type: ADD_ROLE, payload: response.data });
  } catch (error) {
    console.error('Error adding role:', error);
  }
};

export const editRole = (roleId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}${ROLE_URL}/${roleId}`, updatedData);
    dispatch({ type: EDIT_ROLE, payload: { roleId, updatedData: response.data } });
  } catch (error) {
    console.error('Error editing role:', error);
  }
};

export const deleteRole = (roleId) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}${ROLE_URL}/${roleId}`);
    dispatch({ type: DELETE_ROLE, payload: roleId });
  } catch (error) {
    console.error('Error deleting role:', error);
  }
};

export const selectRole = (roleId) => {
  return { type: SELECT_ROLE, payload: roleId };
};
