import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// Pages and Components
import Home from './pages/home';
import Header from './pages/Header';
import CategoriesButton from './job/CategoriesButton'; 
import Apply from './job/apply'; 
import Accounting from './job/Accounting';
import Animation from './job/Animation';
import Finance from './job/Finance';
import Development from './job/Development';
import Management from './job/Management';
import Graphics from './job/Graphics';
import HRM from './job/HRM';
import Marketing from './job/Marketing';
import Companies from './pages/companies';
import About from './pages/about';
import Footer from './pages/Footer';
import SignUp from './pages/signUp';
import DisplayJob from './job/displayJob'; // Ensure this is the correct path
import Update from './job/update';

const App = () => {
    const location = useLocation();
    
    // Determine if the current page is a special page
    const isSpecialPage = 
        location.pathname === '/signUp' || 
        location.pathname.startsWith('/apply') || 
        location.pathname.startsWith('/about') || 
        location.pathname === '/update';

    return (
        <>
            {/* Conditional rendering of Header and CategoriesButton */}
            {!isSpecialPage && (
                <>
                    <Header />
                    <CategoriesButton />
                </>
            )}
            <div className="app">
                <main>
                    <Routes>
                        {/* Define routes for the application */}
                        <Route path="/" element={<Home />} />
                        <Route path="/displayJob/:jobId" element={<DisplayJob />} /> 
                        <Route path="/apply/:jobId" element={<Apply />} />
                        <Route path="/Accounting" element={<Accounting />} />
                        <Route path="/Animation" element={<Animation />} />
                        <Route path="/Finance" element={<Finance />} />
                        <Route path="/Development" element={<Development />} />
                        <Route path="/Management" element={<Management />} />
                        <Route path="/Graphics" element={<Graphics />} />
                        <Route path="/HRM" element={<HRM />} />
                        <Route path="/Marketing" element={<Marketing />} />
                        <Route path="/companies" element={<Companies />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/update" element={<Update />} />
                        {/* Redirect to Home for all other paths */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
                {/* Conditionally render Footer */}
                {!isSpecialPage && <Footer />}
            </div>
        </>
    );
};

// Wrapping the App component with Router
const AppWithRouter = () => (
    <Router>
        <App />
    </Router>
);

export default AppWithRouter;