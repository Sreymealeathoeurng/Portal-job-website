import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import './assets/css/apply.scss';

const Apply = () => {
  const location = useLocation();
  const job = location.state?.job; 
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    gender: '', // Initialize gender
    phone: '',
    email: '',
    address: '',
    nationality: '',
    dateOfBirth: '',
    livingStatus: '',
    experienceYears: '',
    workTitle: '',
    workDescription: '',
    projectTitle: '',
    projectDescription: '',
    educationLevel: '',
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeLink, setResumeLink] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setResumeFile(file);
      const fileUrl = URL.createObjectURL(file);
      setResumeLink(fileUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const formData = new FormData();
    if (profileImage) {
      formData.append('profileImage', profileImage); // Ensure you're sending the file, not the URL
    }
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }
    
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post('http://localhost:5000/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage(response.data.message || 'CV inserted successfully!');
      alert("CV inserted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="apply-container">
      {!submitted ? (
        <form onSubmit={handleSubmit} id='apply-form'> 
          <h1>Apply for {job ? job.title : ""}</h1>
          {message && <p className="error-message">{message}</p>} 

          <div className="header" style={{ display: 'flex', justifyContent: 'center', width: '29%', height: '39%', background: 'none' }}>
            <div className="profile-image" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
              ) : (
                <img src="https://via.placeholder.com/150" alt="Profile" />
              )}
            </div>
          </div>

          <input type="file" accept="image/*" onChange={handleProfileImageChange} />
          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            onChange={handleResumeChange} 
            required 
          />
          {resumeLink && <a href={resumeLink} target="_blank" rel="noopener noreferrer">View Resume</a>}
          
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={userData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Form Fields */}
          {Object.entries(userData).map(([key, value]) => (
            key !== "gender" && ( // Exclude gender from here since it's handled separately
              <div className="form-group" key={key}>
                <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                {key === "workDescription" || key === "projectDescription" ? (
                  <textarea name={key} value={value} onChange={handleChange} />
                ) : (
                  <input type={key === "dateOfBirth" ? "date" : "text"} name={key} value={value} onChange={handleChange} required={key !== "workDescription" && key !== "projectDescription"} />
                )}
              </div>
            )
          ))}

          <div className="action-buttons">
            {/*
           <button type="button" onClick={() => navigate('/update')}>Edit Personal Information</button>
            */}
            
            <button type="submit" id= 'submitbtn'>Submit Application</button>
          </div>
          
        </form>
      ) : (
        <div className="alert">
          <h2>Thank you for your submission!</h2>
          <p>{message}</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      )}
    </div>
  );
};

export default Apply;