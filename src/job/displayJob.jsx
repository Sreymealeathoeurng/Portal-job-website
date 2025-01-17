import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import jobData from './data/db1.json';
import './assets/css/DisplayJob.css';

export default function DisplayJob() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleJobId, setVisibleJobId] = useState(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    locations: [],
    categories: [],
    prices: [],
  });

  const itemsPerPage = 6;

  const filteredJobs = jobData.filter((job) => {
    const matchesLocation = filters.locations.length === 0 || filters.locations.includes(job.location);
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(job.education);
    const matchesPrice = filters.prices.length === 0 || filters.prices.some((price) => {
      const [min, max] = price.split('-').map(Number);
      const jobSalary = typeof job.salary === 'string' ? parseInt(job.salary.replace('$', ''), 10) : 0; // Safety check
      return jobSalary >= min && jobSalary <= max;
    });

    return matchesLocation && matchesCategory && matchesPrice;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const jobsToDisplay = filteredJobs.slice(currentIndex, currentIndex + itemsPerPage);

  const nextJob = () => {
    if (currentIndex + itemsPerPage < filteredJobs.length) {
      setCurrentIndex(prevIndex => prevIndex + itemsPerPage);
    }
  };

  const prevJob = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - itemsPerPage);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex * itemsPerPage);
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

  const toggleVisibility = (jobId) => {
    setVisibleJobId(prevId => (prevId === jobId ? null : jobId));
  };

  return (
    <div className="display-anount-job">
      <div className="big-block">
        {/* Sidebar */}
        <div className={`block1 ${isSidebarOpen ? "" : "collapsed"}`}>
          <div className="sidebar-content">
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
          </div>
        </div>

        {/* Job List */}
        <div className={`block2 ${isSidebarOpen ? "shifted" : ""}`}>
          {jobsToDisplay.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            jobsToDisplay.map((job) => (
              <div key={job.id} className="Job" onClick={() => toggleVisibility(job.id)}>
                <div className="text">
                  <h2>{job.title}</h2>
                  <span>Organization: {job.organization}</span>
                  <span>Location: {job.location}</span>
                  <span>Education: {job.education}</span>
                  <span>Experience: {job.experience}</span>

                  <div className="text2">
                    <label>Salary: {job.salary}</label>
                    <label>Nature: {job.nature}</label>
                  </div>
                  {/* Expanded Job Details *
                  {visibleJobId === job.id && (
                    <div className="job-info">
                      <p>Experience: {job.experience}</p>
                      <p><strong>Role:</strong> {job.role}</p>
                      <p>Responsibilities:</p>
                      <p>{job.responsibilities}</p>
                      <p>Qualifications:</p>
                      <p>{job.qualifications}</p>
                      <p>Offer:</p>
                      <p>{job.offer}</p>
                    </div>
                  )}*/}
                </div>
                
                <div className="btn-container">
                  <button onClick={(e) => { e.stopPropagation(); alert(`Saved: ${job.title}`); }}>Save Job</button>
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/apply/${job.id}`); }}>Apply Now</button>
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