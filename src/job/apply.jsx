import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/apply.css';
import Update from './update'; // Ensure you have the correct path

const Apply = () => {
  const navigate = useNavigate();
  const [cvFile, setCvFile] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    phone: '',
    email: '',
    educationLevel: '',
    livingStatus: '',
    location: '',
    address: '',
    currentPosition: '',
    experienceYears: '',
  }); // Initialize with empty user data

  const handleFileUpload = (file) => {
    setCvFile(file);
    console.log('Uploaded CV:', file);
  };

  const handleSave = (updatedUserData) => {
    console.log('Updated User Data:', updatedUserData);
    setUserData(updatedUserData); // Update the user data with the new data from the form
    navigate('/'); // Navigate back to the main page or wherever you want after saving
  };

  return (
    <div className="body">
      <div className="apply-main-container">
        <div className="apply">
          <div className="first">
            <h1>Apply for</h1>
            <hr />
          </div>
          <div className="second">
            <div className="user">
              <div className="user-info">
                <h2>Name <span id="addedName">{userData.firstName || ''}</span></h2>
                <ul>
                  <li>ភេទ: <span id="addedGender">{userData.gender || ''}</span></li>
                  <li>ថ្ងៃខែឆ្នាំកំណើត: <span id="addedBD">{userData.dateOfBirth || ''}</span></li>
                  <li>សញ្ជាតិ: <span id="addedNationality">{userData.nationality || ''}</span></li>
                  <li>លេខទូរស័ព្ទ: <span id="addedTel">{userData.phone || ''}</span></li>
                  <li>អ៊ីម៉ែល: <span id="addedEmail">{userData.email || ''}</span></li>
                  <li>កម្រិតអប់រំ: <span id="addedStudied">{userData.educationLevel || ''}</span></li>
                  <li>ស្ថានភាពរស់នៅ: <span id="addedLivingStatus">{userData.livingStatus || ''}</span></li>
                </ul>
              </div>
              <div className="user-pic">
                <label htmlFor="file-upload">Upload Photo:</label>
                <div className="image-placeholder">3 x 4</div>
                <input type="file" id="file-upload" name="file-upload" />
              </div>
            </div>
            <div className="update">
              <a onClick={() => navigate('/update')} style={{ cursor: 'pointer' }}>
                កែសម្រួលព័ត៍មានផ្ទាល់ខ្លួន
              </a>
            </div>
          </div>
          <div className="third">
            <h2>ប្រវត្តិរូបដែលបានបំពេញរួច</h2>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: '0%' }}>0%</div>
            </div>

            <div className="button-container">
              <button className="button">រូបថត</button>
              <button className="button">ភេទ</button>
              <button className="button">ថ្ងៃខែឆ្នាំកំណើត</button>
              <button className="button">សញ្ជាតិ</button>
              <button className="button">កម្រិតអប់រំ</button>
              <button className="button">លេខទូរស័ព្ទ</button>
              <button className="button">អ៊ីម៉ែល</button>
              <button id="status" className="button">ស្ថានភាពរស់នៅ</button>
              <button className="button">បទពិសោធន៍</button>
              <button className="button">ភាសា</button>
              <button className="button">ចំណង់ចំណូលចិត្ត</button>
              <button className="button">ឯកសារភ្ជាប់</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;