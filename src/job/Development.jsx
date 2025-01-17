import React, { useEffect, useState } from 'react';
import './assets/css/Acc.css';
import { useNavigate } from "react-router-dom";
import potoImage from './assets/poto.png'; 

const Development = () => {
    const [jobListings, setJobListings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleJobId, setVisibleJobId] = useState(null);
    const navigate = useNavigate();

    const toggleVisibility = (jobId) => {
        setVisibleJobId(prevId => (prevId === jobId ? null : jobId));
    };

    useEffect(() => {
        const fetchJobListings = async () => {
            setLoading(true);
            try {
                const response = await fetch("localhost:5000/Joblisting");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Ensure correct structure when filtering for "Development"
                const developmentJobs = data.find(category => category.category === "Development");
                setJobListings(developmentJobs ? developmentJobs.job : []); // Set the filtered jobs
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobListings();
    }, []);

    return (
        <div className="main">
            <div className="job-list-container">
                <h1 className="job-title">Development Job Listings</h1>
                {loading && <p>Loading...</p>}
                {error && (
                    <div>
                        <p className="error-message">Error: {error}</p>
                        <button onClick={() => setError(null)}>Retry</button>
                    </div>
                )}
                <div className="jobCategories" id="jobCategories">
                    {jobListings.length > 0 ? (
                        jobListings.map((job) => (
                            <div className="job-item" key={job.id}>
                                <div className="job-details">
                                    <div className="company-logo">
                                        <img 
                                            src={job.img || potoImage} // Use the imported image or fallback
                                            alt={job.title} 
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = potoImage; // Fallback to the imported image
                                            }} 
                                        />
                                    </div>
                                    <div className="job-info">
                                        <p 
                                            className="job-position" 
                                            onClick={() => toggleVisibility(job.id)}
                                        >
                                            {job.title}
                                        </p>
                                        <div className="job-meta">
                                            <span className="job-location">
                                            Location: {job.location}
                                            </span>
                                            <br/>
                                            <span className="job-type">
                                                Type: {job.type}
                                            </span>                                              
                                            <span>Experience: {job.experience}</span>
                                        </div>
                                        <div className="job-salary">
                                               <span> {job.salary}</span>
                                        </div>
                                        {visibleJobId === job.id && (
                                            <div className="job-info2">
                                                <h4>ROle: </h4>
                                                <ul> {job.role}</ul>
                                                <h4>Responsibilities:</h4>
                                                <ul>
                                                    {job.responsibilities.map((task, index) => (
                                                        <li key={index}>{task}</li>
                                                    ))}
                                                </ul>
                                                <h4>Qualifications:</h4>
                                                <ul>
                                                    {job.qualifications.map((qual, index) => (
                                                        <li key={index}>{qual}</li>
                                                    ))}
                                                </ul>
                                                <h4>Offer:</h4>
                                                <ul>
                                                    {job.offer.map((offerItem, index) => (
                                                        <li key={index}>{offerItem}</li>
                                                    ))}
                                                </ul>
                                                <div className="contact-container">
                                                    <div className="contact-card">
                                                            Contact: 081 63 72 26
                                                        </div>
                                                        <div className="contact-card">
                                                            <a href="http://www.portaljob.com" target="_blank" rel="noopener noreferrer">
                                                                www.portaljob.com
                                                            </a>
                                                        </div>
                                                </div>
                                                <button id='apply' onClick={(e) => { e.stopPropagation(); navigate(`/apply/${job.id}`); }}>Apply</button> 
                                             
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && <p>No job listings available for Software Development.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Development;