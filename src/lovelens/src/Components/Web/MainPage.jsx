import '../Styles/MainPage.css';
//import qrcode from '../../images/qrcode.png';
import wed1 from '../../images/wed1.png';
import tape1 from '../../images/tape.svg';
import tape2 from '../../images/tape.svg';
import QRCode from 'react-qr-code';

export default function MainPage() {
    const handleScan = data => {
        if (data) {
            console.log('Result: ', data);
        }
    }
        
    const handleError = err => {
        console.error(err);
    }

    return (
        <div className="contentContainerMain">
            <div className="roomDetails">
                <div className="joinRoom">
                    <h1>LOVE LENS</h1>
                    <p>
                        Welcome to Jason's Room, Feel Free to add your pictures!
                    </p>
                    <p className="roomCode">Room Code: 2383</p>
                    <QRCode className='qrcode' delay={300} value='localhost:3000/enterusername' onError={handleError} onScan={handleScan}/>
                    <span>
                        Get in on the fun!
                        <br />
                        Scan the QR code or enter the room code to join now!
                    </span>
                </div>
                <div className="participants">
                    <p className="participantCount">Participants: 9</p>
                </div>
            </div>
            <div className="photoCollage">
                <div className="imageBox">
                    <img className="wedpic" src={wed1} alt="Wedding 1" />
                    <img className="tape1" src={tape1} alt="Tape" />
                    <img className="tape2" src={tape2} alt="Tape" />
                </div>
                <div className="imageBox">
                    <img className="wedpic" src={wed1} alt="Wedding 1" />
                    <img className="tape1" src={tape1} alt="Tape" />
                    <img className="tape2" src={tape2} alt="Tape" />
                </div>
                <div className="imageBox">
                    <img className="wedpic" src={wed1} alt="Wedding 1" />
                    <img className="tape1" src={tape1} alt="Tape" />
                    <img className="tape2" src={tape2} alt="Tape" />
                </div>
                <div className="imageBox">
                    <img className="wedpic" src={wed1} alt="Wedding 1" />
                    <img className="tape1" src={tape1} alt="Tape" />
                    <img className="tape2" src={tape2} alt="Tape" />
                </div>
                <div className="imageBox">
                    <img className="wedpic" src={wed1} alt="Wedding 1" />
                    <img className="tape1" src={tape1} alt="Tape" />
                    <img className="tape2" src={tape2} alt="Tape" />
                </div>
                <div className="imageBox">
                    <img className="wedpic" src={wed1} alt="Wedding 1" />
                    <img className="tape1" src={tape1} alt="Tape" />
                    <img className="tape2" src={tape2} alt="Tape" />
                </div>
            </div>
        </div>
    );
}
