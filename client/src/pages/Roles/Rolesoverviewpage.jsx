import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function Rolesoverviewpage() {
    const location = useLocation();
    const { roleData } = location.state;

    const [values, setValues] = useState({
        rolecode: roleData?.rolecode || '',
        rolename: roleData?.rolename || '',
        privileges: roleData?.privileges || [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
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

    useEffect(() => {
        setValues({
            rolecode: roleData?.rolecode || '',
            rolename: roleData?.rolename || '',
            privileges: roleData?.privileges || [],
        });
    }, [roleData]);

    return (
        <div className="App">
            <div className="parts" style={{ height: '830px', marginLeft: '350px', marginRight: '250px', padding: "17px", paddingBottom: "100px", marginTop: "15px", borderRadius: 10, border: '3px solid #B5A28C' }}>
                <div id="subTopic" style={{ backgroundColor: '#B5A28C', marginBottom: "30px", height: '60px', width: '100%', borderRadius: 15, justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }}>
                    <h4 className="subheaderTitle" style={{ fontSize: '30px', padding: '13px', display: 'flex', alignItems: 'center' }}>
                        Role Overview
                        <FontAwesomeIcon icon={faEdit} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                        <FontAwesomeIcon icon={faSave} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                    </h4>
                    <div className='content-body' style={{ paddingTop: '50px', paddingLeft: "50px" }}>
                        <div className='mb-3'>
                            <label htmlFor="rolecode" style={{ padding: '3px', fontSize: '26px' }}>Role Code:</label>
                            <input type="text" name='rolecode' className='form-control' placeholder='Enter Role Code' style={{ borderRadius: '13px', width: '700px', marginLeft: '16px', paddingTop: '10px', paddingBottom: '10px', fontSize: '21px' }}
                                value={values.rolecode} onChange={handleChange} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="rolename" style={{ padding: '3px', fontSize: '26px' }}>Role Name:</label>
                            <input type="text" name='rolename' className='form-control' placeholder='Enter Role Name' style={{ borderRadius: '13px', width: '700px', marginLeft: '16px', paddingTop: '10px', paddingBottom: '10px', fontSize: '21px' }}
                                value={values.rolename} onChange={handleChange} />
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rolesoverviewpage;
