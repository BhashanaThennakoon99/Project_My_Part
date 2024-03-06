import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faTrash, faPencilAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from 'react-router-dom';
import { ROLE_URL } from '../../utils/Constants';
const BASE_URL = process.env.REACT_APP_BASE_URL;

function Rolesoverviewpage() {
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rolesData, setRolesData] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}${ROLE_URL}`)
      .then(res => setRolesData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleRoleClick = (roleId) => {
    setSelectedRoleId(selectedRoleId === roleId ? null : roleId);
    const role = rolesData.find(role => role.id === roleId);
    setSelectedRole(role);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedRoleId(null); 
  };

  const renderPrivileges = (role) => {
    if (!role || !role.privileges) return null;
    const grantedPrivileges = Object.keys(role.privileges).filter(privilege => role.privileges[privilege]);
    return (
      <div>
        <h4>Privileges of {role.rolename}</h4>
        <ul>
          {grantedPrivileges.map((privilege, index) => (
            <li key={index} style={{ fontSize: '18px' }}>
              {privilege}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const filteredRoles = searchQuery 
    ? rolesData.filter(role => role.rolename.toLowerCase().includes(searchQuery.toLowerCase())) 
    : rolesData;

  return (
    <div className="App">
      <div className="parts" style={{ marginLeft: '350px', marginRight: '250px', padding: "17px", paddingBottom: "100px", marginTop: "24px", borderRadius: 10, border: '3px solid #B5A28C', height: '830px' }}>
        <div id="subTopic" style={{ backgroundColor: '#B5A28C', marginBottom: "30px", height: '60px', width: '1657px', borderRadius: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 className="subheaderTitle" style={{ fontSize: '30px', padding: '13px' }}>Role Overview</h4>
          <div className='headericn' style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/createroles" className='create'><FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} /></Link>
            <FontAwesomeIcon icon={faSave} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} />
            <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} />
            <FontAwesomeIcon icon={faPencilAlt} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} />
            <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.5rem', margin: '10px', cursor: 'pointer' }} />
          </div>
        </div>
        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search Role..." style={{ marginBottom: "30px", marginTop: '10px', padding: "5px", width: "350px", height: '40px', fontSize: '23px' }} />
        <table className="table" width={"900px"} border={1} style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#B5A28C', fontSize: '24px' }}>Role name</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map((role) => (
              <tr key={role.id}>
                <td onClick={() => handleRoleClick(role.id)}>
                  <div className="subti" style={{ fontSize: '20px' }}>{role.rolename}</div>
                  {selectedRoleId === role.id && renderPrivileges(role)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rolesoverviewpage;
