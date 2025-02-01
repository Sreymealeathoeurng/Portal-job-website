import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/UserAcc.scss';

const UserAcc = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);
    const [savedJobs, setSavedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/register'); // Redirect to the login/register page
        }

        // Load saved jobs from local storage
        const savedJobsFromStorage = JSON.parse(localStorage.getItem('savedJobs')) || [];
        setSavedJobs(savedJobsFromStorage);

        // Load applied jobs from local storage
        const appliedJobsFromStorage = JSON.parse(localStorage.getItem('appliedJobs')) || [];
        setAppliedJobs(appliedJobsFromStorage);
    }, [navigate]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/'); // Redirect to the registration page after logout
    };

    const handleGoToApply = () => {
        if (!user) {
            navigate('/register'); // Redirect if user is not logged in
        } else {
            navigate('/apply'); // Redirect to the apply form if logged in
        }
    };

    const handleRemoveJob = (jobId) => {
        const updatedJobs = savedJobs.filter(job => job.id !== jobId);
        setSavedJobs(updatedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    };

    return (
        <div className="UserProfile">
            <div className="form">
               
                <div className="user-profile">
                    <div className="profile">
                       <div className="profile-image">
                            {image ? (
                                <img src={image} alt="Avatar" />
                            ) : (
                                <div className="default-avatar">
                                    {user && user.first_name.charAt(0)}
                                    {user && user.last_name.charAt(0)}
                                </div>
                            )}
                        </div>
                         {/*x
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="mt-2"
                        />
                        */}
                    </div>
                    <div className="user-info">
                        <h2>{user ? `${user.first_name} ${user.last_name}` : 'N/A'}</h2>
                        <p>Phone: {user ? `${user.phonenumber}` : 'N/A'}</p>
                    </div>
                </div>
              <div className="User_save">
              <h2>History</h2>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Position</th>
                                <th scope="col" className="px-6 py-3">Location</th>
                                <th scope="col" className="px-6 py-3">Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appliedJobs.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center">No Applied Jobs</td>
                                </tr>
                            ) : (
                                appliedJobs.map((job) => (
                                    <tr key={job.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{job.title}</td>
                                        <td className="px-6 py-4">{job.location}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{job.salary}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <h2>Saved Jobs</h2>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Position</th>
                                <th scope="col" className="px-6 py-3">Location</th>
                                <th scope="col" className="px-6 py-3">Salary</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savedJobs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No Saved Jobs</td>
                                </tr>
                            ) : (
                                savedJobs.map((job) => (
                                    <tr key={job.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{job.title}</td>
                                        <td className="px-6 py-4">{job.location}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{job.salary}</td>
                                        <td className="px-6 py-4">
                                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleRemoveJob(job.id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
              </div>
               

                <div className="account-management">
                    <button id="logout-button" onClick={handleLogout} className="bg-red-600">Logout</button>
                    <button id="back-account-button" onClick={() => navigate('/')}>Back to home</button>
                </div>
            </div>
        </div>
    );
};

export default UserAcc;