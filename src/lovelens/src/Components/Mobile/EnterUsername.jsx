import '../Styles/EnterUsername.css';
import weddingpic from '../../images/weddingpic.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationPaths } from '../Routes/NavigationPaths';

export default function EnterUsername() {
    const location = useLocation();
    const rCode = location.search.split('=')[1];
    const navigation = useNavigate();

    const submitUsername = (e) => {
        e.preventDefault();
        navigation(
            NavigationPaths.mobileMainPath +
                '?room=' +
                rCode +
                '?username=sdj219048j'
        );
    };

    return (
        <div className="enterUsernameContainer">
            <div className="enterUsernameContent">
                <div className="loveLens">
                    <p className="prodName">LOVE LENS</p>
                </div>
                <div className="wedpic">
                    <img src={weddingpic} alt="Wedding Couple" />
                </div>
                <div className="roomUsername">
                    <div>
                        <p>Room Code: {rCode}</p>
                    </div>
                    <form className="usernameSubmission">
                        <input placeholder="Enter Username"></input>
                        <div className="submitUsername">
                            <button
                                className="submitName"
                                onClick={submitUsername}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
