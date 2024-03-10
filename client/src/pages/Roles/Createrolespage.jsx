import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetUserAction } from '../../actions/UserAction';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles'; 

function Createrolespage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SetUserAction("grbbrtbrtrtb"));
    }, [dispatch]);

    const [values, setValues] = useState({
        rolecode: '',
        rolename: '',
        privileges: [],
    });

    const [errors, setErrors] = useState({
        rolecode: '',
        rolename: '',
    });

    const navigate = useNavigate();

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = { rolecode: '', rolename: '' };

        if (!values.rolecode || values.rolecode.trim().length === 0 || values.rolecode.length > 8) {
            newErrors.rolecode = 'Role ID is mandatory and must be 8 characters or less.';
            formIsValid = false;
        }

        if (!values.rolename || values.rolename.trim().length === 0 || values.rolename.length > 20) {
            newErrors.rolename = 'Role Name is mandatory and must be 20 characters or less.';
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rolecode' && value.length <= 8) {
            setValues({ ...values, rolecode: value });
        } else if (name === 'rolename' && value.length <= 20) {
            setValues({ ...values, rolename: value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        axios.post(`${BASE_URL}${ROLE_URL}`, values)
            .then(res => {
                console.log(res);
                navigate('/', { state: { roleName: values.rolename } });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setValues({
            ...values,
            privileges: checked
                ? [...values.privileges, name]
                : values.privileges.filter(item => item !== name),
        });
    };

    return (
        <div className="App">
            <div className="parts" style={{ height: '830px', marginLeft: '350px', marginRight: '250px', padding: "17px", paddingBottom: "100px", marginTop: "15px", borderRadius: 10, border: '3px solid #B5A28C' }}>
                <div id="subTopic" style={{ backgroundColor: '#B5A28C', marginBottom: "30px", height: '60px', width: '100%', borderRadius: 15, justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }}>
                    <h4 className="subheaderTitle" style={{ fontSize: '30px', padding: '13px' }}>Create Role</h4>
                    <div className='content-body' style={{ paddingTop: '50px', paddingLeft: "50px" }}>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="rolecode" style={{ padding: '3px', fontSize: '26px' }}>Role Code:</label>
                                <input type="text" name='rolecode' className='form-control' placeholder='Enter Role Code' style={{ borderRadius: '13px', width: '700px', marginLeft: '16px', paddingTop: '10px', paddingBottom: '10px', fontSize: '21px' }}
                                    value={values.rolecode} onChange={handleChange} />
                                {errors.rolecode && <div style={{ color: 'red' }}>{errors.rolecode}</div>}
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="rolename" style={{ padding: '3px', fontSize: '26px' }}>Role Name:</label>
                                <input type="text" name='rolename' className='form-control' placeholder='Enter Role Name' style={{ borderRadius: '13px', width: '700px', marginLeft: '16px', paddingTop: '10px', paddingBottom: '10px', fontSize: '21px' }}
                                    value={values.rolename} onChange={handleChange} />
                                {errors.rolename && <div style={{ color: 'red' }}>{errors.rolename}</div>}
                            </div>
                            <div className="mb-3">
                                <table className="table" style={{ width: '70%', marginLeft: '200px', borderCollapse: 'collapse', textAlign: "center" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ fontSize: '1.2em', backgroundColor: '#B5A28C', height: '50px' }}>Privileges</th>
                                            <th style={{ fontSize: '1.2em', backgroundColor: '#B5A28C', height: '50px' }}>Grant</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Checkbox rows for privileges */}
                                        {['createAccess', 'updateAccess', 'viewAccess', 'deleteAccess'].map(privilege => (
                                            <tr key={privilege} style={{ verticalAlign: 'middle' }}>
                                                <td style={{ fontSize: '24px', paddingTop: '20px' }}>{`${privilege.charAt(0).toUpperCase() + privilege.slice(1)} Access`}</td>
                                                <td>
                                                    <input className="form-check-input" type="checkbox" name={privilege}
                                                        checked={values.privileges.includes(privilege)} onChange={handleCheckboxChange} style={{ width: '20px', height: '20px', border: '2px solid black' }} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="submit" className='btn btn-success' style={{ fontSize: '1.2em', marginLeft: '10px', marginTop: '20px', marginBottom: '33px', borderRadius: '9px', width: '80px', height: '38px', padding: '3px' }}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Createrolespage; 