import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRole } from '../../store/actions/RoleActions';

const Createrolespage = () => {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        rolecode: '',
        rolename: '',
        privileges: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addRole(values));
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
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="rolename" style={{ padding: '3px', fontSize: '26px' }}>Role Name:</label>
                                <input type="text" name='rolename' className='form-control' placeholder='Enter Role Name' style={{ borderRadius: '13px', width: '700px', marginLeft: '16px', paddingTop: '10px', paddingBottom: '10px', fontSize: '21px' }}
                                    value={values.rolename} onChange={handleChange} />
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
