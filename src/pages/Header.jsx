import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import axios from 'axios';

const BackgroundImg = () => {
    return (
        <div className="background-image">
            <img src="assets/img/image.png" alt="Background" />
        </div>
    );
};

const MenuContainer = ({ navigate }) => {
    const [navbar, setNavbar] = useState(false);

    const changeBg = () => {
        setNavbar(window.scrollY >= 80);
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBg);
        return () => {
            window.removeEventListener('scroll', changeBg);
        };
    }, []);

    return (
        <nav className={`navbar ${navbar ? 'scrolled' : ''}`} id='menu'>
            <div className="menu-contain">
                <ul>
                    <li>
                        <Link to="Header" spy={true} smooth={true} offset={50} duration={500} onClick={() => navigate('./home')}>
                            Home
                        </Link>
                    </li>
                    <li className="dropdown">
                        <button className="dropdown-toggle" id="jobsDropdown" aria-expanded="false">Jobs</button>
                        <ul className="dropdown-menu" aria-labelledby="jobsDropdown">
                            {["Accounting", "Finance", "Graphics", "Development", "Animation", "Management", "Marketing", "HRM", "Design", "Sales"].map(category => (
                                <li key={category}>
                                    <Link to="categories" spy={true} smooth={true} offset={50} duration={500}>
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="dropdown">
                        <button className="dropdown-toggle" id="companiesDropdown" aria-expanded="false">
                            Companies
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="companiesDropdown">
                            {["ChipMong 271", "Aeon Mall Sen Sok", "Aeon Mall 2", "Makro", "Amazon Cafe", "Others"].map(company => (
                                <li key={company}>
                                    <Link to="big-block" spy={true} smooth={true} offset={50} duration={500}>
                                        {company}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <Link onClick={() => navigate('./about')}>About Us</Link> <span id="ic">⟶</span>
                    </li>
                    <li><Link onClick={() => navigate('./signUp')}>Sign In</Link></li>
                </ul>
            </div>
        </nav>
    );
};

const Header = ({ showBackgroundImg = true, showContent = true }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate();

    const keywords = [
        "Software", "Design", "Marketing", "Finance", "HR",
        "Sales", "Engineering", "Data Science", "Project Management", "Animation"
    ];

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:5000/jobListings?query=${query}`);
            setResults(response.data);
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        const filteredRecommendations = value
            ? keywords.filter(keyword => keyword.toLowerCase().includes(value.toLowerCase()))
            : [];
        setRecommendations(filteredRecommendations);
    };

    const selectRecommendation = (keyword) => {
        setQuery(keyword);
        setRecommendations([]);
    };

    return (
        <header className='Header'>
            <MenuContainer navigate={navigate} />
            {showBackgroundImg && <BackgroundImg />}

            {showContent && (
                <div className="text-content" style={{ position: 'absolute', top: '20%' }}>
                    <div className="welcometxt">
                        <h2>Find Your <br /> Dream Job Here</h2>
                        <p>You have many options for finding a job—each potentially expanding <br /> the number and types of roles you discover. <br /> Let’s go over four main ways to find your next job.</p>
                    </div>

                    <section className="search-bar">
                        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <div className="search-field">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input
                                    type="text"
                                    placeholder="Keywords"
                                    value={query}
                                    onChange={handleInputChange} 
                                />
                                {recommendations.length > 0 && (
                                    <ul className="recommendations">
                                        {recommendations.map((keyword, index) => (
                                            <li key={index} onClick={() => selectRecommendation(keyword)}>
                                                {keyword}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="search-field">
                                <i className="fa-solid fa-location-dot"></i>
                                <select id="location" name="location">
                                    <option value="">Location</option>
                                    <option value="phnom_penh">Phnom Penh</option>
                                    <option value="kompung_spue">Kompung Spue</option>
                                    <option value="siem_reap">Siem Reap</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="search-field">
                                <i className="fa-solid fa-business-time"></i>
                                <select id="job-type" name="job-type">
                                    <option value="">Looking for</option>
                                    <option value="full-time">Full-Time</option>
                                    <option value="part-time">Part-Time</option>
                                </select>
                            </div>

                            <button type="submit" id='search'><h3>Search</h3></button>
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <p className="error">{error}</p>}
                        {results.length > 0 && (
                            <ul>
                                {results.map(job => (
                                    <li key={job.id}>
                                        <h4>{job.title} at {job.company}</h4>
                                        <p>{job.location} - ${job.salary}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            )}
        </header>
    );
};

export default Header;