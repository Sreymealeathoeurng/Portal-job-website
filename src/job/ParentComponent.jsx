import React from 'react';
import Update from './updatepdate';

const ParentComponent = () => {
  const handleFileUpload = (file) => {
    console.log('File uploaded:', file);
    // Your file upload logic here
  };

  const handleSave = (formData) => {
    console.log('Form data saved:', formData);
    // Add your save logic here (e.g., send data to an API)
  };

  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'ប្រុស',
    dateOfBirth: '1990-01-01',
    nationality: 'កម្ពុជា',
    phone: '012345678',
    email: 'john.doe@example.com',
    educationLevel: 'វិទ្យាល័យ',
    livingStatus: 'រស់នៅដោយខ្លួនឯង',
    location: 'ភ្នំពេញ',
    address: '123 Main St',
    currentPosition: 'Developer',
    experienceYears: '5',
  };

  return (
    <div>
      <h1>User Update Form</h1>
      <Update 
        onFileUpload={handleFileUpload} 
        userData={userData} 
        onSave={handleSave}  // Ensure this is a valid function
      />
    </div>
  );
};

export default ParentComponent;