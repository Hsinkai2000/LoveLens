import '../Styles/GuestMain.css';
import tape1 from '../../images/tape.svg';
import tape2 from '../../images/tape.svg';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function GuestMain() {
    const [imageData, setImageData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [isInitial, setIsInitial] = useState(false);
    const location = useLocation();
    const rCode = location.search.split('=')[1];

    const delay = 2000;
    const [index, setIndex] = useState(0);

    const POLLING_INTERVAL = 5000;
    const [isPolling, setIsPolling] = useState(false);

    const fetchData = async () => {

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
            <div className="guestMainContainer" style={{}}>
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
                <div className="guestMainContent">
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
        </div>
    );
}
