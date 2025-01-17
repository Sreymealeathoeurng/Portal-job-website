import React, { useState } from 'react';
import './assets/css/apply.css';
import db from './data/db1.json';

const UserForm = ({ onFileUpload, userData, onSave }) => {
  const [cvFile, setCvFile] = useState(null);
  const [formData, setFormData] = useState(userData);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCvFile(file);
      onFileUpload(file);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData); // Call the save function with the updated data
    alert('User information saved!'); // Temporary feedback
  };

  return (
    <form id="userForm" className="userForm" onSubmit={handleSubmit}>
      <header>
        <p>ព័ត៍មាន​ផ្ទាល់ខ្លួន</p>
      </header>
      <div className="fill-box">
        <div className="first-fill">
          <div className="first-fill1">
            <div className="small-picture">
              <input type="file" id="file-upload" name="file-upload" onChange={handleFileChange} />
            </div>
            <div className="input-full-name">
              <input id="first-name" type="text" placeholder="នាមខ្លួន" value={formData.firstName} onChange={handleChange} />
              <input id="last-name" type="text" placeholder="នាមត្រកូល" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="first-fill2">
            <label htmlFor="">ភេទ</label>
            <div id="gender" className="input-gender">
              <button type="button">{formData.gender}</button>
            </div>
          </div>
        </div>
        <div className="second-fill">
          <input id="date" type="date" placeholder="ថ្ងៃខែឆ្នាំកំណើត" value={formData.dateOfBirth} onChange={handleChange} />
          <input id="nationality" type="text" placeholder="សញ្ជាតិ" value={formData.nationality} onChange={handleChange} />
          <input id="email" type="text" placeholder="អ៊ីម៊ែល" value={formData.email} onChange={handleChange} />
          <input id="Tel" type="text" placeholder="លេខទូរស័ព្ទ" value={formData.phone} onChange={handleChange} />
          <select id="location" value={formData.location} onChange={handleChange}>
            <option hidden value="">ទីតាំង</option>
            <option value="ភ្នំពេញ">ភ្នំពេញ</option>
            <option value="កំពង់ស្ពឺ">កំពង់ស្ពឺ</option>
            <option value="តាកែវ">តាកែវ</option>
            <option value="កំពង់ឆ្នាំង">កំពង់ឆ្នាំង</option>
            <option value="កំពត">កំពត</option>
          </select>
          <input id="address" type="text" placeholder="អាស័យដ្ឋាន" value={formData.address} onChange={handleChange} />
          <select id="education" value={formData.educationLevel} onChange={handleChange}>
            <option hidden value="">កម្រិតអប់រំ</option>
            <option value="វិទ្យាល័យ">វិទ្យាល័យ</option>
            <option value="បរិញ្ញាបត្ររង">បរិញ្ញាបត្ររង</option>
            <option value="វិជ្ជាជីវៈ">វិជ្ជាជីវៈ</option>
            <option value="បរិញ្ញាបត្រ">បរិញ្ញាបត្រ</option>
            <option value="អនុបណ្ឌិត">អនុបណ្ឌិត</option>
            <option value="បណ្ឌិត">បណ្ឌិត</option>
          </select>
          <input id="currentPosition" type="text" placeholder="មុខតំណែងបច្ចុប្បន្ន" value={formData.currentPosition} onChange={handleChange} />
          <input id="experience" type="text" placeholder="បទពិសោធន៍(ឆ្នាំ)" value={formData.experienceYears} onChange={handleChange} />
        </div>
        <div className="third-fill">
          <label>ស្ថានភាពរស់នៅ</label>
          <div id="situation" className="input-box">
            <button type="button">{formData.livingStatus}</button>
          </div>
        </div>
      </div>
      <div className="save-box">
        <button type="submit">រក្សាទុក</button>
      </div>
    </form>
  );
};

const Apply = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const toggleUserForm = () => {
    setShowUserForm(!showUserForm);
  };

  const handleFileUpload = (file) => {
    setCvFile(file);
    console.log('Uploaded CV:', file);
  };

  const handleSave = (updatedUserData) => {
    // Here you would typically update the user data in your state or send it to a server
    console.log('Updated User Data:', updatedUserData);
  };

  const user = db[db.length - 1].user; // Accessing the user object
  const jobListings = db.slice(0, db.length - 1); // All job listings

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
                <h2>Name <span id="addedName">{user ? user.firstName : ''}</span></h2>
                <ul>
                  <li>ភេទ: <span id="addedGender">{user ? user.gender : ''}</span></li>
                  <li>ថ្ងៃខែឆ្នាំកំណើត: <span id="addedBD">{user ? user.dateOfBirth : ''}</span></li>
                  <li>សញ្ជាតិ: <span id="addedNationality">{user ? user.nationality : ''}</span></li>
                  <li>លេខទូរស័ព្ទ: <span id="addedTel">{user ? user.phone : ''}</span></li>
                  <li>អ៊ីម៉ែល: <span id="addedEmail">{user ? user.email : ''}</span></li>
                  <li>កម្រិតអប់រំ: <span id="addedStudied">{user ? user.educationLevel : ''}</span></li>
                  <li>ស្ថានភាពរស់នៅ: <span id="addedLive">{user ? user.livingStatus : ''}</span></li>
                </ul>
              </div>
              <div className="user-pic">
                <label htmlFor="file-upload">Upload Photo:</label>
                <div className="image-placeholder">3 x 4</div>
                <input type="file" id="file-upload" name="file-upload" />
              </div>
            </div>
            <div className="update">
              <a onClick={toggleUserForm} style={{ cursor: 'pointer' }}>កែសម្រួលព័ត៍មានផ្ទាល់ខ្លួន</a>
            </div>
          </div>
          {showUserForm && <UserForm onFileUpload={handleFileUpload} userData={user} onSave={handleSave} />}
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