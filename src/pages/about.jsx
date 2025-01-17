import React from 'react';
import Footer from './Footer';
import Header from './Header';
import './assets/sass/about.scss';
import ruppImage from './assets/img/rupp.jpg'; 
import fe from './assets/img/fe.png';
import ite from './assets/img/ite.png';  
import img1 from './assets/img/mealea.jpg'; // Ensure the image path is correct
import img2 from './assets/img/chata.jpg'; // Ensure the image path is correct
import img3 from './assets/img/lin.jpg'; // Ensure the image path is correct
import img4 from './assets/img/hong.jpg'; // Ensure the image path is correct
const About = () => {
    // Function to open the Royal University of Phnom Penh website
    const openRuppWebsite = () => {
        window.open("https://www.rupp.edu.kh/", "_blank");
    };

    // Function to open the Faculty of Engineering website
    const openFeWebsite = () => {
        window.open("https://www.fe.rupp.edu.kh/", "_blank");
    };

    // Function to open the specific program page
    const openIteWebsite = () => {
        window.open("https://www.fe.rupp.edu.kh/program/7", "_blank");
    };

    const teamMembers = [
        {
            name: 'Thoeurng sreymealea',
            experience: 'Student of IT Engineering',
            imageUrl: img1, // Use imported image
        },
        {
            name: 'CHUM SOCHEATA',
            experience: 'Student of IT Engineering',
            imageUrl: img2, // Replace with actual image URL
        },
        {
            name: 'KOUN SOKHALIN',
            experience: 'Student of IT Engineering',
            imageUrl: img3, // Replace with actual image URL
        },
        {
            name: 'Kim Ehong',
            experience: 'Student of IT Engineering',
            imageUrl: img4, // Replace with actual image URL
        },
    ];

    return (
        <>
            <Header showBackgroundImg={false} showContent={false} />
          
            <div className="stars">
                {[...Array(50)].map((_, index) => (
                    <div key={index} className="star"></div>
                ))}
            </div>

            <div className='main-container-about-us'>
                <div className="about-us-content">
                    <div className="text-container">
                        <section className='first'>
                            <h1>ABOUT US <hr /></h1>
                            <section className='second'>
                                <p>
                                    We are the students of Generation 9 from the Department of Information Technology at the Faculty of Engineering, 
                                    Royal University of Phnom Penh. Our mission is to foster innovation, collaboration, and excellence in the field of IT engineering. 
                                    As future leaders and problem solvers, we are dedicated to enhancing our skills and knowledge to contribute positively to our communities and the tech industry. 
                                    We believe in the power of teamwork and are eager to connect with fellow students, faculty, and industry professionals. 
                                    We invite you to reach out to us for collaboration, inquiries, or mentorship opportunities. 
                                    Together, we can drive technological advancements and create solutions that make a difference. 
                                    Currently, we are working on developing a Job Portal website aimed at bridging the gap between job seekers and employers. 
                                </p>
                            </section>
                        </section>
                        
                        <div className="img-container">
                            <div className="img1">
                                <img 
                                    src={ruppImage} 
                                    alt="Royal University of Phnom Penh" 
                                    onClick={openRuppWebsite} 
                                    style={{ cursor: 'pointer' }} 
                                />
                            </div>
                            <div className="img2">
                                <img 
                                    src={fe} 
                                    alt="Faculty of Engineering" 
                                    onClick={openFeWebsite} 
                                    style={{ cursor: 'pointer' }} 
                                />
                                <img 
                                    src={ite} 
                                    alt="Institute of Technology" 
                                    onClick={openIteWebsite} 
                                    style={{ cursor: 'pointer' }} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="teamSection">
                <h1 style={{position: 'relative',top: '20pc'}}>Meet Our Team</h1>
                <div className="teamMembers">
                    {teamMembers.map((member, index) => (
                        <div className="teamMember" key={index}>
                            <img src={member.imageUrl} alt={member.name} className="memberImage" />
                            <h3>{member.name}</h3>
                            <p>{member.experience}</p>
                            <div className="socialLinks">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default About;