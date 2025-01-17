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
import DisplayJob from './job/displayJob';

const App = () => {
    const location = useLocation();
    
    // Determine if the current page is Sign Up or Apply
    const isSpecialPage = location.pathname === '/signUp' || location.pathname.startsWith('/apply') ||location.pathname.startsWith('/about');

    return (
        <>
         {/* Conditional rendering of Header and CategoriesButton */}
                {!isSpecialPage && (
                    <>
                        <Header/>
                        <CategoriesButton />
                    </>
                )}
            <div className="app">
                <main>
                    <Routes>
                        {/* Define routes for the application */}
                        <Route path="/" element={<Home />} />
                        <Route path='/displayJob' element={<DisplayJob />} />
                        <Route path="/apply/:jobId" element={<Apply />} />
                        <Route path="/accounting" element={<Accounting />} />
                        <Route path="/animation" element={<Animation />} />
                        <Route path="/finance" element={<Finance />} />
                        <Route path="/development" element={<Development />} />
                        <Route path="/management" element={<Management />} />
                        <Route path="/graphics" element={<Graphics />} />
                        <Route path="/hrm" element={<HRM />} />
                        <Route path="/marketing" element={<Marketing />} />
                        <Route path="/companies" element={<Companies />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/signUp" element={<SignUp />} />
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