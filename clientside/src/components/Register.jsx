import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    pwd: '',
    cpwd: '',

  });
  const [previewImage, setPreviewImage] = useState(null);

  formData.email=localStorage.getItem("email")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, pic: reader.result }); 
        setPreviewImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    try {
      console.log(formData);
      
      const res = await axios.post("http://localhost:3006/api/adduser", formData);
      if(res.status==201){
      alert("Registration successfull", res.data);
      localStorage.removeItem('email')
      navigate('/login')
    }
    } catch (error) {
      alert("Error during registration:", error);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form className="register-form" onSubmit={handleSignup}>
      <div className="form-group">
            {previewImage && (
              <img
                src={previewImage}
                alt="Profile Preview"
                style={{ marginTop: "10px", width: "100px", height: "100px", borderRadius: "50%" }}
              />
            )}
            <label>Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="pwd"
          value={formData.pwd}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="cpwd"
          value={formData.cpwd}
          onChange={handleChange}
          required
        />
        <button type="submit" className="register-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
