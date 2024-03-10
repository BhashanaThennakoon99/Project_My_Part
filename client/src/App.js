import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarpart from './components/Navbarpart';
import Headerpart from './components/Headerpart';
import Createrolespage from './pages/Roles/Createrolespage';
import Roleslistpage from './pages/Roles/Roleslistpage';
import Rolesoverviewpage from './pages/Roles/Rolesoverviewpage';

function App() {
  return (
    <Router>
      <div>
        <Headerpart />
        <Navbarpart />
        <Routes>
          <Route path="/createroles" element={<Createrolespage />} />
          <Route path="/" element={<Roleslistpage />} />
          <Route path="/rolesoverview/:roleId" element={<Rolesoverviewpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
