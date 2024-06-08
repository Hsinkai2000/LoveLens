import './Styles/LandingPage.css';
import wedpic from '../images/Wedding_1.svg';
import picPlaceholder from '../images/weddingbackground2.png';
import igIcon from '../images/igIcon.png';
import emailIcon from '../images/emailIcon.png';
import phoneIcon from '../images/phoneIcon.png';
import { useNavigate } from 'react-router-dom';
import { NavigationPaths } from './Routes/NavigationPaths';

export default function LandingPage() {
    const navigation = useNavigate();
    
    return (
        <div className='LandingContainer'>
            <div className='aboutCompany'>
                <div className='companyDescription'>
                    <h1>SweetVows:</h1>
                    <p>Your All-in-One Wedding Planner - From 'Yes' to 'I Do' with Ease and Elegance</p>
                    <div className='descriptionButtons'>
                        <button className='learnMore'>Learn More!</button>
                        <button className='signUpLogin' onClick={(e) => navigation(NavigationPaths.loginPath)}>Sign Up! / Login</button>
                    </div>
                </div>
                <div className='vecImg'>
                    <img
                        className="wedpic"
                        src={wedpic}
                        key={wedpic}
                        alt="Wedding 1"
                    />
                    <div className='carpet'></div>
                </div>
            </div>
            <div className='backgroundContent'>
                <div className='story'>
                    <img
                        className="placeholder"
                        src={picPlaceholder}
                        key={picPlaceholder}
                        alt="Placeholder"
                    />
                    <div className='storyContent'>
                        <h3>Our Story</h3>
                        <p>Planning a wedding can be overwhelming, but SweetVows simplifies everything. From meticulous planning to seamless guest management and engaging digital activities, we provide a one-stop solution for your big day. Trust SweetVows to handle the details, so you can cherish every moment of your wedding day blissfully.</p>
                    </div>
                </div>
                <div className='lovelensDesc'>
                    <div className='descContainer1'>
                        <h3>Love Lens</h3>
                        <p>In addition to creating a wonderful wedding that the bride and groom will enjoy, we aim to also involve the wedding guests in the process. Love Lens is a photos display site where guests can upload pictures taken during their wedding for everyone to see and leave a like.</p>
                    </div>
                    <img
                        className="placeholder"
                        src={picPlaceholder}
                        key={picPlaceholder}
                        alt="Placeholder"
                    />
                    <div className='descContainer2'>
                        <h3>Love Lens</h3>
                        <p>In addition to creating a wonderful wedding that the bride and groom will enjoy, we aim to also involve the wedding guests in the process. Love Lens is a photos display site where guests can upload pictures taken during their wedding for everyone to see and leave a like.</p>
                    </div>
                </div>
            </div>
            <div className='footerMobLand'>
                <hr></hr>
                <h5>Contact Us</h5>
                <div className='contactIcons'>
                    <img
                        className="phoneIcon"
                        src={phoneIcon}
                        key={phoneIcon}
                        alt="phoneIcon"
                    />
                    <img
                        className="emailIcon"
                        src={emailIcon}
                        key={emailIcon}
                        alt="emailIcon"
                    />
                    <img
                        className="igIcon"
                        src={igIcon}
                        key={igIcon}
                        alt="igIcon"
                    />
                </div>
            </div>
        </div>
    )
}
