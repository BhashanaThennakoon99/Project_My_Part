import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRoles, deleteRole, updateRole } from '../../store/actions/RoleActions'; // Import updateRole action
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faTrash, faPencilAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function Roleslistpage() {
    const location = useLocation();
    const roleName = location.state ? location.state.roleName : '';
    const dispatch = useDispatch();
    const user = useSelector((state) => state.SetUserReducer.user); // Ensure SetUserReducer is properly defined in your rootReducer
    const roles = useSelector(state => state.roles);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    const toggleRowSelection = (rowId) => {
        const isSelected = selectedRows.includes(rowId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    const deleteSelectedRows = () => {
        selectedRows.forEach(rowId => {
            dispatch(deleteRole(roles[rowId].id));
        });
        setSelectedRows([]);
    };

    const handleEdit = (rowId) => {
        setEditingRow(rowId);
        setEditedRoleName(roles[rowId].rolename);
    };

    const handleMoreOptions = () => {
        if (selectedRows.length === 1) {
            const selectedRole = roles[selectedRows[0]];
            navigate(`/rolesoverview/${selectedRole.id}`, { state: { roleData: selectedRole } });
        }
    };

    const handleSave = () => {
        const roleId = roles[editingRow].id;
        dispatch(updateRole(roleId, { rolename: editedRoleName }));
        setEditingRow(null);
    };

    return (
        <div className="App">
            <div className="parts" style={{ marginLeft: '350px', marginRight: '250px', padding: "17px", paddingBottom: "100px", marginTop: "24px", borderRadius: 10, border: '3px solid #B5A28C' }}>
                <div id="subTopic" style={{ backgroundColor: '#B5A28C', marginBottom: "30px", height: '60px', width: '1657px', borderRadius: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="subheaderTitle" style={{ fontSize: '30px', padding: '13px' }}>Roles</h4>
                    <div className='iconsheader' style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="createroles" className='createpage'><FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} /></Link>
                        <FontAwesomeIcon icon={faSave} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} onClick={handleSave} />
                        <FontAwesomeIcon icon={faPencilAlt} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} onClick={() => handleEdit(selectedRows[0])} />
                        <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} onClick={deleteSelectedRows} />
                        <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} onClick={handleMoreOptions} />
                    </div>
                </div>
                <table className="table" width={"900px"} border={1} style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th style={{ backgroundColor: '#B5A28C', fontSize: '24px' }}>Role name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles && roles.map((role, index) => (
                            <tr key={role.id}>
                                <td>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="view"
                                        style={{ width: '20px', height: '20px', border: '2px solid black', marginRight: '20px' }}
                                        onChange={() => toggleRowSelection(index)}
                                        checked={selectedRows.includes(index)}
                                    />
                                    <Link to={'/rolesoverview'} className="view-btn">
                                        <button className="view"><FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.5rem', margin: '3px', cursor: 'pointer' }} /></button>
                                    </Link>
                                </td>
                                <td style={{ fontSize: '21px' }}>
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedRoleName}
                                            onChange={(e) => setEditedRoleName(e.target.value)}
                                        />
                                    ) : (
                                        role.rolename
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Roleslistpage;
