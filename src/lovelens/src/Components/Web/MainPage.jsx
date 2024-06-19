import '../Styles/MainPage.css';
//import qrcode from '../../images/qrcode.png';
import tape1 from '../../images/tape.svg';
import tape2 from '../../images/tape.svg';
import QRCode from 'react-qr-code';
import axios from 'axios';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LOCALSTORAGEKEY } from '../../LocalStorageKeys.jsx';

export default function MainPage() {
    const [imageData, setImageData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [isInitial, setIsInitial] = useState(false);
    //const [data, setData] = useState([])
    const location = useLocation();
    const rCode = location.search.split('=')[1];

    const delay = 2000;
    const [index, setIndex] = useState(0);

    const POLLING_INTERVAL = 5000;
    const [isPolling, setIsPolling] = useState(false);

    const handleScan = (data) => {
        if (data) {
            console.log('Result: ', data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const roomName = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.room_details)).name;

    const fetchData = async () => {
        // axios.get("https://api.sweet-vows.com/api/room/T9NH7tSDR9hVIDCOMW0QUJXFAgy1",
        // {headers:{
        //     Authorization : token,
        //     "Content-Type" : "application/json"
        // }})
        // .then(res => {
        //     const {rooms} = res.data;
        //     setData(rooms);
        // })
        // .catch((err) => {
        //     console.log(err.message);
        // });

        const image_api = process.env.REACT_APP_URL + '/api/image/' + rCode;
        axios
            .get(image_api, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((image_res) => {
                const { room } = image_res.data;
                setImageData(room);

                if (!isInitial) {
                    console.log(isInitial);
                    setInitialData(room);
                }

                console.log('Image Data: ' + imageData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchData();
        setIsPolling(true);
        setIsInitial(true);
    }, []);

    useEffect(() => {
        if (!isPolling) return;

        const intervalId = setInterval(() => {
            fetchData();
        }, POLLING_INTERVAL);

        return () => clearInterval(intervalId);
    }, [isPolling]);

    useEffect(() => {
        if (initialData) {
            const nextIndex = index === initialData.length - 1 ? 0 : index + 1;
            setTimeout(() => setIndex(nextIndex), delay);

            if (nextIndex === 1) {
                setInitialData(imageData);
            }
        }

        return () => {};
    }, [index]);

    const fileUpload = (event) => {
        var formData = new FormData();

        formData.append('room_code', rCode);
        formData.append('image', event.target.files[0]);

        axios
            .post(process.env.REACT_APP_URL + '/api/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                console.log('image uploaded');
                window.location.reload();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <div className="mobileMainContainer" style={{}}>
                <div className="mainHeaderContainer">
                    <div className="headerLoveLens">
                        <p className="prodName">LOVE LENS</p>
                    </div>
                    <div className="welcomeMsg">
                        <p>
                            Welcome to Hsin-Yueh and Yi Cong's Wedding Collage, Feel
                            Free to add your pictures!
                        </p>
                    </div>
                </div>
                <div className="mobileMainContent">
                    <div className="photoList">
                        {[...imageData].reverse().map((image) => (
                            <div className="wrapImage">
                                <div className="imageBox">
                                    <img
                                        className="wedpic"
                                        src={image}
                                        key={image}
                                        alt="Wedding 1"
                                    />
                                    <img
                                        className="tape1"
                                        src={tape1}
                                        key={{ image } + 't1'}
                                        alt="Tape"
                                    />
                                    <img
                                        className="tape2"
                                        src={tape2}
                                        key={{ image } + 't2'}
                                        alt="Tape"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <button className="addPicButton">&#43;</button>
                    <input
                        className="chooseFile"
                        type="file"
                        accept="image/*"
                        onChange={fileUpload}
                    />
                </div>
            </div>
            <div className="contentContainerMain">
                <div className="roomDetails">
                    <div className="joinRoom">
                        <h1>LOVE LENS</h1>
                        <p>
                            Welcome to {roomName}, Feel
                            Free to add your pictures!
                        </p>
                        <p className="roomCode">Room Code: {rCode}</p>
                        <QRCode
                            className="qrcode"
                            delay={300}
                            value={'sweet-vows.com/enterusername?room=' + rCode}
                            onError={handleError}
                            onScan={handleScan}
                        />
                        <span>
                            Get in on the fun!
                            <br />
                            Scan the QR code or enter the room code to join now!
                        </span>
                    </div>
                    <div className="participants">
                        <p className="participantCount"></p>
                    </div>
                </div>
                <div className="photoCont">
                    <div className="slideshowContainer">
                        <div className="slideshow">
                            <div
                                className="slideshowSlider"
                                style={{
                                    transform: `translate3d(${-index * 100}%, 0, 0)`
                                }}
                            >
                                {[...initialData].reverse().map((image, index) => (
                                    <div className="slide" key={index}>
                                        <img src={image} alt="slideshow"></img>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="photoCollage">
                        {[...imageData].reverse().map((image) => (
                            <div className="imageBox">
                                <a href={image} rel="noreferrer" target="_blank">
                                    <img
                                        className="wedpic"
                                        src={image}
                                        alt="Wedding 1"
                                    />
                                </a>
                                <img className="tape1" src={tape1} alt="Tape" />
                                <img className="tape2" src={tape2} alt="Tape" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
