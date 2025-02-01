import React, { useState, useEffect } from 'react';
import './assets/css/update.scss';

const Update = ({ onFileUpload, userData, onSave = () => {} }) => {
  const initialData = userData ? {
    image: userData.image || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    gender: userData.gender || '',
    dateOfBirth: userData.dateOfBirth || '',
    nationality: userData.nationality || '',
    phone: userData.phone || '',
    email: userData.email || '',
    educationLevel: userData.educationLevel || '',
    livingStatus: userData.livingStatus || '',
    location: userData.location || '',
    address: userData.address || '',
    currentPosition: userData.currentPosition || '',
    experienceYears: userData.experienceYears || '',
  } : {};

  const [formData, setFormData] = useState(initialData);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (userData) {
      setFormData(initialData);
      setSelectedImage(userData.image);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleGenderChange = (gender) => {
    setFormData((prevData) => ({ ...prevData, gender }));
  };

  const handleLivingStatusChange = (status) => {
    setFormData((prevData) => ({ ...prevData, livingStatus: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill out all required fields.');
      return;
    }

    // Send data to the server
    const response = await fetch('http://localhost:5000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Data is saved!');
      onSave(formData);
    } else {
      alert('Failed to save data.');
    }
  };

  return (
    <div className="update-container">
      <form onSubmit={handleSubmit} className="user-form">
        <header>
          <p>Personal Information</p>
        </header>
        <div className="fill-box">
          <div className="first-fill">
            <div className="small-picture">
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                onChange={handleFileChange}
              />
              {selectedImage && (
                <img src={selectedImage} alt="Selected" className="profile-image" />
              )}
            </div>
          </div>
          <div className="second-fill">
            <div className="input-full-name">
              <label>First Name:</label>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <label>Last Name:</label>
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-gender" style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Gender: <span>{formData.gender}</span></label>
              <div className="gender-btn">
                <button type="button" onClick={() => handleGenderChange('Male')} style={{ width: '45%', margin: '20px' }}>Male</button>
                <button type="button" onClick={() => handleGenderChange('Female')} style={{ width: '45%' }}>Female</button>
              </div>
            </div>
            <label>Date of Birth:</label>
            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <label>Nationality:</label>
            <input
              name="nationality"
              type="text"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
            <label>Email:</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Phone Number:</label>
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <div className="editLocation">
            <label>Location:</label>
            <select name="location" value={formData.location} onChange={handleChange} className='locationInput'>
              <option hidden value="">Select Location</option>
              <option value="Phnom Penh">Phnom Penh</option>
              <option value="Kampong Speu">Kampong Speu</option>
              <option value="Takeo">Takeo</option>
              <option value="Kampong Chhnang">Kampong Chhnang</option>
              <option value="Kampot">Kampot</option>
            </select>

            </div>
           
            <label>Address:</label>
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <div className="editlevelEducation">
            <label>Education Level:</label>
            <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className='levelEducation'>
              <option hidden value="">Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Associate's Degree">Associate's Degree</option>
              <option value="Vocational">Vocational</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate">Doctorate</option>
            </select>
            </div>
      
            <label>Current Position:</label>
            <input
              name="currentPosition"
              type="text"
              placeholder="Current Position"
              value={formData.currentPosition}
              onChange={handleChange}
            />
            <label>Experience (Years):</label>
            <input
              name="experienceYears"
              type="text"
              placeholder="Experience (Years)"
              value={formData.experienceYears}
              onChange={handleChange}
            />
          </div>
          <div className="third-fill">
            <label>Living Situation: <span>{formData.livingStatus}</span></label>
            <div className="input-box">
              <button type="button" onClick={() => handleLivingStatusChange('Living Alone')}>Living Alone</button>
              <button type="button" onClick={() => handleLivingStatusChange('Living Together')}>Living Together</button>
              <button type="button" onClick={() => handleLivingStatusChange('Living with Relatives')}>Living with Relatives</button>
            </div>
          </div>
        </div>
        <div className="save-box">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Update;