import React from 'react';
// import { useNavigate } from 'react-router-dom';
import img from '../assets/th.jpg'
import './Nav.css'; // Import the CSS file

const Nav = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     alert('Logged out successfully!');
//     navigate('/login'); // Navigate to the Login page
//   };

//   const handleProfile = () => {
//     alert('Navigating to Profile...');
//     navigate('/profile'); 
//   };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="profile-name">Manasa</span>
        <img
          src={img}
          alt="Profile"
          className="profile-image"
        />
      </div>
      <div className="dropdown">
        <button className="dropdown-button">▼</button>
        <div className="dropdown-content">
          <button >Profile</button>
          <button >Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
