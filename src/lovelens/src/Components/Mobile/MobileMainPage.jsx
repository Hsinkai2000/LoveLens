import '../Styles/MobileMainPage.css'
import wed1 from '../../images/wed1.png';
import tape1 from '../../images/tape.svg';
import tape2 from '../../images/tape.svg';

export default function MobileMainPage() {

    return(
        <div className='mobileMainContainer'>
            <div className='mainHeaderContainer'>
                <div className='headerLoveLens'><p className='prodName'>LOVE LENS</p></div>
                <div className='welcomeMsg'><p>Welcome to Jason's Room, Feel Free to add your pictures!</p></div>
            </div>
            <div className='mobileMainContent'>
                <div className='photoList'>
                    <div className='wrapImage'>
                        <div className="imageBox">
                            <img className="wedpic" src={wed1} alt="Wedding 1" />
                            <img className="tape1" src={tape1} alt="Tape" />
                            <img className="tape2" src={tape2} alt="Tape" />
                        </div>
                    </div>
                    <div className='wrapImage'>
                        <div className="imageBox">
                            <img className="wedpic" src={wed1} alt="Wedding 1" />
                            <img className="tape1" src={tape1} alt="Tape" />
                            <img className="tape2" src={tape2} alt="Tape" />
                        </div>
                    </div>
                    <div className='wrapImage'>
                        <div className="imageBox">
                            <img className="wedpic" src={wed1} alt="Wedding 1" />
                            <img className="tape1" src={tape1} alt="Tape" />
                            <img className="tape2" src={tape2} alt="Tape" />
                        </div>
                    </div>
                    <div className='wrapImage'>
                        <div className="imageBox">
                            <img className="wedpic" src={wed1} alt="Wedding 1" />
                            <img className="tape1" src={tape1} alt="Tape" />
                            <img className="tape2" src={tape2} alt="Tape" />
                        </div>
                    </div>
                    <div className='wrapImage'>
                        <div className="imageBox">
                            <img className="wedpic" src={wed1} alt="Wedding 1" />
                            <img className="tape1" src={tape1} alt="Tape" />
                            <img className="tape2" src={tape2} alt="Tape" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button className='addPicButton'>&#43;</button>
            </div>
        </div>
    )
}