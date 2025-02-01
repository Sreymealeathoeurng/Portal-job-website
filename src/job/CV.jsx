import React, { useState } from 'react';
import './assets/css/CV.scss';

const CV = ({ initialUserData, profileImage }) => {
  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // Implement the save logic here (e.g., API call)
    console.log('Saving user data:', userData);
  };

  return (
    <div className="cv-container1">
      <div className="header1">
        {profileImage && <img src={profileImage} alt="Profile" className="profile-image1" />}
        <div className="user-info">
          <input
            type="text"
            name="firstName"
            value={userData.firstName || ''}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={userData.lastName || ''}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={userData.email || ''}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={userData.phone || ''}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            type="text"
            name="address"
            value={userData.address || ''}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="nationality"
            value={userData.nationality || ''}
            onChange={handleChange}
            placeholder="Nationality"
          />
          <input
            type="text"
            name="gender"
            value={userData.gender || ''}
            onChange={handleChange}
            placeholder="Gender"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={userData.dateOfBirth || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="livingStatus"
            value={userData.livingStatus || ''}
            onChange={handleChange}
            placeholder="Living Status"
          />
          <input
            type="number"
            name="experienceYears"
            value={userData.experienceYears || ''}
            onChange={handleChange}
            placeholder="Experience Years"
          />
          <input
            type="text"
            name="workTitle"
            value={userData.workTitle || ''}
            onChange={handleChange}
            placeholder="Work Title"
          />
        </div>
      </div>
      <div className="extra-info">
        <div className="extra-info-contact" style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
          <section>
            <h2>Career Profile</h2>
            <textarea
              name="projectDescription"
              value={userData.projectDescription || ''}
              onChange={handleChange}
              placeholder="Project Description"
            />
          </section>

          <section>
            <h2>Education</h2>
            <input
              type="text"
              name="educationLevel"
              value={userData.educationLevel || ''}
              onChange={handleChange}
              placeholder="Education Level"
            />
          </section>

          <section>
            <h2>Experiences</h2>
            <div>
              <input
                type="text"
                name="workDescription"
                value={userData.workDescription || ''}
                onChange={handleChange}
                placeholder="Work Description"
              />
            </div>
          </section>

          <section>
            <h2>Projects</h2>
            <div>
              <input
                type="text"
                name="projectTitle"
                value={userData.projectTitle || ''}
                onChange={handleChange}
                placeholder="Project Title"
              />
              <textarea
                name="projectDescription"
                value={userData.projectDescription || ''}
                onChange={handleChange}
                placeholder="Project Description"
              />
            </div>
          </section>

          <section>
            <h2>Conferences & Certificates</h2>
            <p>Optional</p>
          </section>
        </div>
      </div>
      <button onClick={handleSave} className="save-button">Save CV</button>
    </div>
  );
};

export default CV;