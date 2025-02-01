import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import jobData from './data/db1.json';
import './assets/css/DisplayJob.css';

export default function DisplayJob() {
    const location = useLocation(); // Get the current location
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filters, setFilters] = useState({
        locations: [],
        categories: [],
        prices: [],
    });
    const [visibleJobs, setVisibleJobs] = useState([]); // State to track visible job details
    const navigate = useNavigate();
    const itemsPerPage = 6;

    // Check if user is logged in
    const isUserLoggedIn = !!localStorage.getItem('user'); // Replace with your authentication logic

    const filteredJobs = jobData.filter((job) => {
        const matchesLocation = filters.locations.length === 0 || filters.locations.includes(job.location);
        const matchesCategory = filters.categories.length === 0 || filters.categories.includes(job.education);
        const matchesPrice = filters.prices.length === 0 || filters.prices.some((price) => {
            const [min, max] = price.split('-').map(Number);
            const jobSalary = typeof job.salary === 'string' ? parseInt(job.salary.replace('$', ''), 10) : 0;
            return jobSalary >= min && jobSalary <= max;
        });

        return matchesLocation && matchesCategory && matchesPrice;
    });

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const jobsToDisplay = filteredJobs.slice(currentIndex, currentIndex + itemsPerPage);

    const handleSaveJob = (job) => {
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        const jobExists = savedJobs.some(savedJob => savedJob.id === job.id);

        if (!jobExists) {
            savedJobs.push(job);
            localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
            alert(`Saved: ${job.title}`);
        } else {
            alert(`Job already saved: ${job.title}`);
        }
    };

    const handleApply = (job) => {
        if (!isUserLoggedIn) {
            alert("You need to be logged in to apply for a job. Redirecting you to the registration page.");
            navigate('/register'); // Redirect to register if not logged in
        } else {
            const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
            const jobExists = appliedJobs.some(appliedJob => appliedJob.id === job.id);

            if (!jobExists) {
                appliedJobs.push(job);
                localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
                alert(`Applied for: ${job.title}`);
            } else {
                alert(`You have already applied for: ${job.title}`);
            }

            navigate(`/apply/${job.id}`, { state: { job } }); // Navigate to the Apply page
        }
    };

    const toggleFilter = (filterType, value) => {
        setFilters((prevFilters) => {
            const currentFilters = prevFilters[filterType];
            return {
                ...prevFilters,
                [filterType]: currentFilters.includes(value)
                    ? currentFilters.filter((v) => v !== value) // Remove filter
                    : [...currentFilters, value], // Add filter
            };
        });
    };

    const prevJob = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - itemsPerPage);
        }
    };

    const nextJob = () => {
        if (currentIndex + itemsPerPage < filteredJobs.length) {
            setCurrentIndex(prevIndex => prevIndex + itemsPerPage);
        }
    };

    const goToPage = (pageIndex) => {
        setCurrentIndex(pageIndex * itemsPerPage);
    };

    // Check if we are on the /UserAcc route
    if (location.pathname === '/UserAcc') {
        return null; // Hide the job display form
    }

    const toggleJobDetails = (jobId) => {
        setVisibleJobs((prevVisible) => {
            if (prevVisible.includes(jobId)) {
                return prevVisible.filter(id => id !== jobId); // Hide details
            } else {
                return [...prevVisible, jobId]; // Show details
            }
        });
    };

    return (
        <div className="display-anount-job">
            <div className="big-block">
                {/* Sidebar */}
                <div className={`block1 ${isSidebarOpen ? "" : "collapsed"}`}>
                    <div className="sidebar-content">
                       
                        <label className="title">By Category</label><br />
                        {["Accounting", "Finance", "Graphics", "Development", "Animation", "Management", "Marketing", "HRM"].map(category => (
                            <div key={category}>
                                <label>{category}</label>
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(category)}
                                    onChange={() => toggleFilter('categories', category)}
                                />
                            </div>
                        ))}
                        <label className="title">By Price</label><br />
                        {["200-300", "300-400", "400-500", "500-600", "600-700", "700-800", "800-900", "900-1000"].map(priceRange => (
                            <div key={priceRange}>
                                <label>${priceRange}</label>
                                <input
                                    type="checkbox"
                                    checked={filters.prices.includes(priceRange)}
                                    onChange={() => toggleFilter('prices', priceRange)}
                                />
                            </div>
                        ))}
                         <label className="title">By Location</label><br />
                        {["Ta Kmau", "Takeo", "Kom Pot", "KPC", "SR", "PP", "PVH", "Kep"].map(location => (
                            <div key={location}>
                                <label>{location}</label>
                                <input
                                    type="checkbox"
                                    checked={filters.locations.includes(location)}
                                    onChange={() => toggleFilter('locations', location)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Job List */}
                <div className={`block2 ${isSidebarOpen ? "shifted" : ""}`}>
                    {jobsToDisplay.length === 0 ? (
                        <p>No jobs found.</p>
                    ) : (
                        jobsToDisplay.map((job) => (
                            <div key={job.id} className="Job">
                                <div className="text">
                                    <h2 onClick={() => toggleJobDetails(job.id)} style={{ cursor: 'pointer' }}>{job.title}</h2>
                                    <span>Organization: {job.organization}</span>
                                    <span>Location: {job.location}</span>
                                    <span>Education: {job.education}</span>
                                    <span>Experience: {job.experience}</span>
                                     
                                    {visibleJobs.includes(job.id) && (

                                        <>
                                         <span>Role:{job.role}</span>
                                            <span>Responsibilities:{job.responsibilities}</span>
                                            <span>Qualifications: {job.qualifications}</span>
                                            <span>Offer: {job.offer}</span>
                                        </>
                                           
                                        
                                    )}

                                   
                                    <div className="text2">
                                        <label>Salary: {job.salary}</label>
                                        <label>Nature: {job.nature}</label>
                                    </div>
                                </div>
                                
                                <div className="btn-container">
                                    <button onClick={() => handleSaveJob(job)}>Save Job</button>
                                    <button onClick={() => handleApply(job)}>Apply Now</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="footer-at-searchBar">
                <p onClick={prevJob} className={currentIndex === 0 ? "disabled" : ""} style={{ cursor: currentIndex > 0 ? "pointer" : "default" }}>⟵</p>
                {Array.from({ length: totalPages }, (_, index) => (
                    <p key={index} onClick={() => goToPage(index)} className={currentIndex / itemsPerPage === index ? "active" : ""} style={{ cursor: "pointer" }}>
                        {index + 1}
                    </p>
                ))}
                <p onClick={nextJob} className={currentIndex + itemsPerPage >= filteredJobs.length ? "disabled" : ""} style={{ cursor: currentIndex + itemsPerPage < filteredJobs.length ? "pointer" : "default" }}>⟶</p>
            </div>
        </div>
    );
}