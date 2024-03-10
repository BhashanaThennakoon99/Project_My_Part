import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SetUserAction } from '../../actions/UserAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faTrash, faPencilAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles';

function Roleslistpage() {
    const location = useLocation();
    const roleName = location.state ? location.state.roleName : '';
    const dispatch = useDispatch();
    const user = useSelector((state) => state.SetUserReducer.user);
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [editingRow, setEditingRow] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`${BASE_URL}${ROLE_URL}`)
            .then((response) => {
                setData(response.data);
            })
            .catch(err => console.log(err));
    };

    const toggleRowSelection = (rowId) => {
        const isSelected = selectedRows.includes(rowId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    const deleteSelectedRows = () => {
        const newData = data.filter((d, i) => !selectedRows.includes(i));
        setData(newData);
        selectedRows.forEach(rowId => {
            axios.delete(`${BASE_URL}${ROLE_URL}/${data[rowId].id}`)
                .then(res => {
                    console.log("Deleted successfully.");
                })
                .catch(err => console.log(err));
        });
        setSelectedRows([]);
    };

    const handleEdit = (rowId) => {
        setEditingRow(rowId);
        setEditedRoleName(data[rowId].rolename);
    };

    const handleMoreOptions = () => {
        if (selectedRows.length === 1) {
            const selectedRole = data[selectedRows[0]];
            navigate(`/rolesoverview/${selectedRole.id}`, { state: { roleData: selectedRole } });
        }
    };

    const handleSave = () => {
        const newData = data.map((d, i) => {
            if (i === editingRow) {
                return { ...d, rolename: editedRoleName };
            }
            return d;
        });
        setData(newData);
        axios.put(`${BASE_URL}${ROLE_URL}/${data[editingRow].id}`, { rolename: editedRoleName })
            .then(res => {
                console.log("Data saved successfully.");
            })
            .catch(err => console.log(err));
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
                        {data && data.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="view"
                                        style={{ width: '20px', height: '20px', border: '2px solid black', marginRight: '20px' }}
                                        onChange={() => toggleRowSelection(i)}
                                        checked={selectedRows.includes(i)}
                                    />
                                    <Link to={'/rolesoverview'} className="view-btn">
                                        <button className="view"><FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.5rem', margin: '3px', cursor: 'pointer' }} /></button>
                                    </Link>
                                </td>
                                <td style={{ fontSize: '21px' }}>
                                    {editingRow === i ? (
                                        <input
                                            type="text"
                                            value={editedRoleName}
                                            onChange={(e) => setEditedRoleName(e.target.value)}
                                        />
                                    ) : (
                                        item.rolename
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
