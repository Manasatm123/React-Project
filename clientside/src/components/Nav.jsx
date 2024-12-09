import React from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css'; 

const Nav = ({user,pic}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/login'); 
    location.reload()
  };

  const handleProfile = () => {
    navigate('/profile'); 
    location.reload()
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="profile-name">{user}</span>
        <img
          src={pic}
          alt=""
          className="profile-image"
        />
      </div>
      <div className="dropdown">
        <button className="dropdown-button">▼</button>
        <div className="dropdown-content">
          <button onClick={handleProfile}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
