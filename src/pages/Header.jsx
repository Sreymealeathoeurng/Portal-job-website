import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import db from '../job/data/db.json'; // Import local JSON data
import UserAcc from './UserAcc'; // Import the UserAcc component

const BackgroundImg = () => (
    <div className="background-image">
        <img src="assets/img/image.png" alt="Background" />
    </div>
);

const MenuContainer = ({ navigate, handleToggleUserAcc }) => {
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
        <nav className={`navbar ${navbar ? 'scrolled' : ''}`}  >
            <div className="logo">
                <img src="assets/img/logo.png" alt="Logo" />
            </div>
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
                    <li>
                        <Link onClick={() => navigate('./about')}>About Us</Link>
                    </li>
                    <li>
                        <Link onClick={() => navigate('./register')}>Sign In</Link>
                    </li>
                    <li>
                        <Link onClick={handleToggleUserAcc} aria-label="User Account">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#F3F3F3">
                                <path d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z" />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

const Header = ({ user, onLogout, showBackgroundImg = true }) => {
    const [showUserAcc, setShowUserAcc] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleToggleUserAcc = () => {
        setShowUserAcc(prev => !prev);

        // If switching to UserAcc, navigate to the UserAcc route
        if (!showUserAcc) {
            navigate('/UserAcc');
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        // Implement search logic based on `query`
        const filteredResults = db.filter(job => job.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setResults(filteredResults);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // You can perform additional actions on search if needed
    };

    const selectRecommendation = (keyword) => {
        setQuery(keyword);
        // Trigger a search when a recommendation is clicked
        handleSearch({ target: { value: keyword } });
    };

    return (
        <header className='Header'>
            <MenuContainer navigate={navigate} handleToggleUserAcc={handleToggleUserAcc} />
            {showUserAcc ? (
                <UserAcc /> // Render UserAcc component if showUserAcc is true
            ) : (
                <>
                    {showBackgroundImg && <BackgroundImg />}
                    <div className="top-text-content">
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
                                        onChange={handleInputChange} />
                                    {results.length > 0 && (
                                        <ul className="recommendations">
                                            {results.map((job, index) => (
                                                <li key={index} onClick={() => selectRecommendation(job.title)}>
                                                    {job.title}
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
                                        <option value="seim_reab">Seim Reab</option>
                                        <option value="more">Other</option>
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
                        </section>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;