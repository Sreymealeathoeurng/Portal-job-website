import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footerContainer">
      <section className="contenttxt1">
        <div className="contact-form">
          <input 
            type="email" 
            placeholder="Enter your email" 
            aria-label="Email address" 
            required 
          />
          <button type="submit">Get In Touch</button>
        </div>
      </section>
     
      <section className="contenttxt">
        <div className="footer-container">
          <div className="job-portal">
          <h3>Job <span style={{ color: 'rgb(116, 196, 196)' }}>Portal</span></h3>
           
            
            <p>Purpose, job duties and responsibilities, required qualifications, preferred qualifications, and working conditions.</p>
          </div>
          
          <div className="useful-link">
            <h3>Useful <span style={{ color: 'rgb(116, 196, 196)' }}>Links</span></h3>
            <ul>
              <li><a onClick={() => navigate('./home')} style={{ cursor: 'pointer' }}>Home</a></li>
              <li><a onClick={() => navigate('./job')} style={{ cursor: 'pointer' }}>Job</a></li>
              <li><a onClick={() => navigate('./careers')} style={{ cursor: 'pointer' }}>Careers</a></li>
              <li><a onClick={() => navigate('./about')} style={{ cursor: 'pointer' }}>About Us</a></li>
              <li><a onClick={() => navigate('./signUp')} style={{ cursor: 'pointer' }}>Sign Up</a></li>
            </ul>
          </div>
          
          <div className="connect-us">
            <h3>Connect <span style={{ color: 'rgb(116, 196, 196)' }}>Us</span></h3>
            <p>Russia Lea, Phnom Penh, Cambodia</p>
            <p>+855 123 456 78</p>
            <a 
              href="https://facebook.com/Cambodia" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              facebook.com/Cambodia
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}