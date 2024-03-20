import '../Styles/ManageCollage.css';
import wed1 from '../../images/wed1.png';
import tape1 from '../../images/tape.svg';
import tape2 from '../../images/tape.svg';
import NavBar from '../Routes/NavBar';

export default function ManageCollage() {
    return (
        <div className="management">
            <NavBar></NavBar>
            <div className="headerSection">
                <div className="descSection">
                    <h1>Manage Collage</h1>
                    <span>Manage your room collage here!</span>
                </div>
                <div className="detailsSection">
                    <div>
                        <text>Jason's Wedding Collage</text>
                    </div>
                    <div>
                        <p>Room Code: 4836</p>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="actionsSection">
                <div className="actionButtons">
                    <button className="selectPhotos">Select Photo(s)</button>
                    <button className="downloadPhotos">Download Photos</button>
                    <button className="deletePhotos">Delete Photos</button>
                </div>
                <button className="downloadCollage">Download Collage</button>
            </div>
            <div className="contentContainerManage">
                <div className="photos">
                    <div className="image">
                        <img className="wedpic" src={wed1} alt="Wedding 1" />
                        <img className="tape1" src={tape1} alt="Tape" />
                        <img className="tape2" src={tape2} alt="Tape" />
                    </div>
                    <div className="image">
                        <img className="wedpic" src={wed1} alt="Wedding 1" />
                        <img className="tape1" src={tape1} alt="Tape" />
                        <img className="tape2" src={tape2} alt="Tape" />
                    </div>
                    <div className="image">
                        <img className="wedpic" src={wed1} alt="Wedding 1" />
                        <img className="tape1" src={tape1} alt="Tape" />
                        <img className="tape2" src={tape2} alt="Tape" />
                    </div>
                    <div className="image">
                        <img className="wedpic" src={wed1} alt="Wedding 1" />
                        <img className="tape1" src={tape1} alt="Tape" />
                        <img className="tape2" src={tape2} alt="Tape" />
                    </div>
                    <div className="image">
                        <img className="wedpic" src={wed1} alt="Wedding 1" />
                        <img className="tape1" src={tape1} alt="Tape" />
                        <img className="tape2" src={tape2} alt="Tape" />
                    </div>
                    <div className="image">
                        <img className="wedpic" src={wed1} alt="Wedding 1" />
                        <img className="tape1" src={tape1} alt="Tape" />
                        <img className="tape2" src={tape2} alt="Tape" />
                    </div>
                </div>
            </div>
        </div>
    );
}
