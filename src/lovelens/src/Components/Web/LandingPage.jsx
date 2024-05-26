import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LandingPage.css';
import sweetvowsicon from '../../images/sweetvowsicon.ico';
import weddingmain from '../../images/weddingmain.jpg';
import downarrow from '../../images/downarrow.png';
import weddingplanner from '../../images/weddingplanner.jpg';

export default function LandingPage() {
    return (
        <div className="landingPageContainer">
            <div className="TopBar">
                <img
                    className="sweetvowsicon"
                    src={sweetvowsicon}
                    alt={'Sweetvows icon'}
                />
                <h1 className="LovelensName">SweetVows</h1>
            </div>
            <div className="mainimagebackground">
                <img
                    className="mainimagebackgoundimage"
                    src={weddingmain}
                    alt="wedding image"
                />
            </div>
            <img className="downarrow" src={downarrow}></img>

            <div className="ourstory">
                <img
                    className="weddingplanningimage"
                    src={weddingplanner}
                    alt={'wedding planner image'}
                />
                <div className="ourstorytext">
                    <h2>OUR STORY</h2>
                    <p>
                        Planning a wedding can be overwhelming, but SweetVows
                        simplifies everything. From meticulous planning to
                        seamless guest management and engaging digital
                        activities, we provide a one-stop solution for your big
                        day. Trust SweetVows to handle the details, so you can
                        cherish every moment of your wedding day blissfully.
                    </p>
                </div>
            </div>
        </div>
    );
}
