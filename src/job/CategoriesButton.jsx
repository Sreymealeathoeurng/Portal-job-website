import React, { useState } from 'react';
import { Link } from 'react-scroll'; 
import './assets/css/style.css';
import Accounting from './Accounting';
import Animation from './Animation';
import Developer from './Development';
import Finance from './Finance';
import Graphics from './Graphics';
import Management from './Management';
import Marketing from './Marketing';
import HRM from './HRM';
import DisplayJob from './displayJob';

export default function CategoriesButton() {
    const [DisplayJobData, setDisplayJobData] = useState(true);
    const [AccountingData, setAccountingData] = useState(false);
    const [AnimationData, setAnimationData] = useState(false);
    const [DevelopmentData, setDevelopmentData] = useState(false);
    const [FinanceData, setFinanceData] = useState(false);
    const [GraphicsData, setGraphicsData] = useState(false);
    const [HRMData, setHRMData] = useState(false);
    const [ManagementData, setManagementData] = useState(false);
    const [MarketingData, setMarketingData] = useState(false);

    const resetStates = () => {
        setDisplayJobData(false);
        setAccountingData(false);
        setAnimationData(false);
        setDevelopmentData(false);
        setFinanceData(false);
        setGraphicsData(false);
        setHRMData(false);
        setManagementData(false);
        setMarketingData(false);
    };

    return (
        <div className="categories">
            <div className="job-categories">
                <div className="category-item">
                    <div className="icon">
                        <img src="assets/img/photo_3_2024-10-23_00-26-06.jpg" alt="Accounting" />
                    </div>
                    <h3><ul>
                        <Link 
                            to="/finding-job-block" 
                            spy={true} 
                            smooth={true} 
                            offset={50} 
                            duration={500} 
                            onClick={() => { resetStates(); setAccountingData(true); }}
                        >
                            Accounting
                        </Link>
                        </ul>
                    </h3>
                    <p>21 Jobs</p>
                </div>
                <div className="category-item">
                    <div className="icon">
                        <img src="assets/img/Finace.jpg" alt="Finance" />
                    </div>
                    <h3><ul>
                        <Link 
                            to="/finding-job-block" 
                            spy={true} 
                            smooth={true} 
                            offset={50} 
                            duration={500} 
                            onClick={() => { resetStates(); setFinanceData(true); }}
                        >
                            Finance
                        </Link>
                        </ul>
                    </h3>
                    <p>21 Jobs</p>
                </div>
                <div className="category-item">
                    <div className="icon">
                        <img src="assets/img/graphics.jpg" alt="Graphics" />
                    </div>
                    <h3><ul>
                        <Link 
                            to="/finding-job-block" 
                            spy={true} 
                            smooth={true} 
                            offset={50} 
                            duration={500} 
                            onClick={() => { resetStates(); setGraphicsData(true); }}
                        >
                            Graphics
                        </Link>
                        </ul>
                    </h3>
                    <p>21 Jobs</p>
                </div>
                <div className="category-item">
                    <div className="icon">
                        <img src="assets/img/developer.jpg" alt="Development" />
                    </div>
                    <h3><ul>
                        <Link 
                            to="/finding-job-block" 
                            spy={true} 
                            smooth={true} 
                            offset={50} 
                            duration={500} 
                            onClick={() => { resetStates(); setDevelopmentData(true); }}
                        >
                            Development
                        </Link>
                        </ul>
                    </h3>
                    <p>21 Jobs</p>
                </div>
                <div className="category-item">
                    <div className="icon">
                        <img src="assets/img/acto.jpg" alt="Animation" />
                    </div>
                    <h3><ul>
                        <Link 
                            to="/finding-job-block" 
                            spy={true} 
                            smooth={true} 
                            offset={50} 
                            duration={500} 
                            onClick={() => { resetStates(); setAnimationData(true); }}
                        >
                            Animation
                        </Link>
                        </ul>
                    </h3>
                    <p>21 Jobs</p>
                </div>
                <div className="category-item">
                    <div className="icon">
                        <img src="assets/img/management.jpg" alt="Management" />
                    </div>
                    <h3><ul>
                        <Link 
                            to="/finding-job-block" 
                            spy={true} 
                            smooth={true} 
                            offset={50} 
                            duration={500} 
                            onClick={() => { resetStates(); setManagementData(true); }}
                        >
                            Management
                        </Link>
                        </ul>
                    </h3>
                    <p>21 Jobs</p>
                </div>
                <div className="category-item">
                    <div className="icon">
                        <img src="assets/img/marketing.jpg" alt="Marketing" />
                    </div>
                    <h3><ul>
                        <Link 
                            to="/finding-job-block" 
                            spy={true} 
                            smooth={true} 
                            offset={50} 
                            duration={500} 
                            onClick={() => { resetStates(); setMarketingData(true); }}
                        >
                            Marketing
                        </Link>
                        </ul>
                    </h3>
                    <p>21 Jobs</p>
                </div>
                <div className="category-item">
                    <div className="icon">
                        <img src="assets/img/tree.jpg" alt="HRM" />
                    </div>
                    <h3><ul>
                        <Link 
                            to="/finding-job-block" 
                            spy={true} 
                            smooth={true} 
                            offset={50} 
                            duration={500} 
                            onClick={() => { resetStates(); setHRMData(true); }}
                        >
                            HRM
                        </Link>
                        </ul>
                    </h3>
                    <p>21 Jobs</p>
                </div>
            </div>

            {DisplayJobData && <DisplayJob />}
            {AccountingData && <Accounting />}
            {AnimationData && <Animation />}
            {DevelopmentData && <Developer />}
            {FinanceData && <Finance />}
            {GraphicsData && <Graphics />}
            {HRMData && <HRM />}
            {ManagementData && <Management />}
            {MarketingData && <Marketing />}
        </div>
    );
}