import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// Pages and Components
import Home from './pages/home';
import Header from './pages/Header';
import CategoriesButton from './job/CategoriesButton'; 
import ApplyForm from './job/apply'; 
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
import Register from './pages/register';
import DisplayJob from './job/displayJob';
import Update from './job/update';
import LoginForm from './pages/login';
import UserAcc from './pages/UserAcc';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
    const location = useLocation();

    const specialPages = ['/register', '/apply', '/about', '/update', '/UserAcc'];

    const isSpecialPage = specialPages.some(page => location.pathname.startsWith(page));

    return (
        <>
            {!isSpecialPage && (
                <>
                    <Header />
                    <CategoriesButton />
                </>
            )}
            <div className="app">
                <main>
                    <ErrorBoundary>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/displayJob/:jobId" element={<DisplayJob />} />
                            <Route path="/apply/:jobId" element={<ApplyForm />} />
                            <Route path="/apply" element={<ApplyForm />} />
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
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/update" element={<Update />} />
                            <Route path="/UserAcc" element={<UserAcc />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </ErrorBoundary>
                </main>
                {!isSpecialPage && <Footer />}
            </div>
        </>
    );
};

const AppWithRouter = () => (
    <Router>
        <App />
    </Router>
);

export default AppWithRouter;