import React, { useState } from 'react';
import './assets/css/apply.css';

const Update = ({ onFileUpload, userData, onSave = () => {} }) => {
  const initialData = userData ? {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleGenderChange = (gender) => {
    setFormData((prevData) => ({ ...prevData, gender }));
  };

  const handleLivingStatusChange = (status) => {
    setFormData((prevData) => ({ ...prevData, livingStatus: status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    alert('File is saved!'); // Alert when saving data
  };

  return (
    <form id="userForm" onSubmit={handleSubmit} style={{ width: '90%', maxWidth: '900px', border: '1px solid #ccc', padding: '20px', margin: '20px auto', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
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
              <input id="first-name" name="firstName" type="text" placeholder="នាមខ្លួន" value={formData.firstName} onChange={handleChange} />
              <input id="last-name" name="lastName" type="text" placeholder="នាមត្រកូល" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="first-fill2">
            <label>ភេទ</label>
            <div id="gender" className="input-gender">
              <button type="button" onClick={() => handleGenderChange('ប្រុស')}>ប្រុស</button>
              <button type="button" onClick={() => handleGenderChange('ស្រី')}>ស្រី</button>
              <span>{formData.gender}</span>
            </div>
          </div>
        </div>
        <div className="second-fill">
          <input id="date" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
          <input id="nationality" name="nationality" type="text" placeholder="សញ្ជាតិ" value={formData.nationality} onChange={handleChange} />
          <input id="email" name="email" type="email" placeholder="អ៊ីម៊ែល" value={formData.email} onChange={handleChange} />
          <input id="Tel" name="phone" type="text" placeholder="លេខទូរស័ព្ទ" value={formData.phone} onChange={handleChange} />
          <select id="location" name="location" value={formData.location} onChange={handleChange}>
            <option hidden value="">ទីតាំង</option>
            <option value="ភ្នំពេញ">ភ្នំពេញ</option>
            <option value="កំពង់ស្ពឺ">កំពង់ស្ពឺ</option>
            <option value="តាកែវ">តាកែវ</option>
            <option value="កំពង់ឆ្នាំង">កំពង់ឆ្នាំង</option>
            <option value="កំពត">កំពត</option>
          </select>
          <input id="address" name="address" type="text" placeholder="អាស័យដ្ឋាន" value={formData.address} onChange={handleChange} />
          <select id="education" name="educationLevel" value={formData.educationLevel} onChange={handleChange}>
            <option hidden value="">កម្រិតអប់រំ</option>
            <option value="វិទ្យាល័យ">វិទ្យាល័យ</option>
            <option value="បរិញ្ញាបត្ររង">បរិញ្ញាបត្ររង</option>
            <option value="វិជ្ជាជីវៈ">វិជ្ជាជីវៈ</option>
            <option value="បរិញ្ញាបត្រ">បរិញ្ញាបត្រ</option>
            <option value="អនុបណ្ឌិត">អនុបណ្ឌិត</option>
            <option value="បណ្ឌិត">បណ្ឌិត</option>
          </select>
          <input id="currentPosition" name="currentPosition" type="text" placeholder="មុខតំណែងបច្ចុប្បន្ន" value={formData.currentPosition} onChange={handleChange} />
          <input id="experience" name="experienceYears" type="text" placeholder="បទពិសោធន៍(ឆ្នាំ)" value={formData.experienceYears} onChange={handleChange} />
        </div>
        <div className="third-fill">
          <label>ស្ថានភាពរស់នៅ</label>
          <div id="situation" className="input-box">
            <button type="button" onClick={() => handleLivingStatusChange('រស់នៅដោយខ្លួនឯង')}>
              រស់នៅដោយខ្លួនឯង
            </button>
            <button type="button" onClick={() => handleLivingStatusChange('រស់នៅជាមួយគ្នា')}>
              រស់នៅជាមួយគ្នា
            </button>
            <button type="button" onClick={() => handleLivingStatusChange('នៅគាត់')}>
              នៅគាត់
            </button>
          </div>
          <span>ស្ថានភាព: {formData.livingStatus}</span>
        </div>
      </div>
      <div className="save-box">
        <button type="submit">រក្សាទុក</button>
      </div>
    </form>
  );
};

export default Update;