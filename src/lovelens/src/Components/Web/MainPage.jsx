import '../Styles/MainPage.css';
//import qrcode from '../../images/qrcode.png';
import tape1 from '../../images/tape.svg';
import tape2 from '../../images/tape.svg';
import QRCode from 'react-qr-code';
import axios from 'axios';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

    const token =
        'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG92ZWxlbnMtNTM1YmMiLCJhdWQiOiJsb3ZlbGVucy01MzViYyIsImF1dGhfdGltZSI6MTcxMjIxMDMzOSwidXNlcl9pZCI6IlQ5Tkg3dFNEUjloVklEQ09NVzBRVUpYRkFneTEiLCJzdWIiOiJUOU5IN3RTRFI5aFZJRENPTVcwUVVKWEZBZ3kxIiwiaWF0IjoxNzEyMjEwMzM5LCJleHAiOjE3MTIyMTM5MzksImVtYWlsIjoidGVzdGVyMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0ZXIxMjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.OQaFTHRpD5bTkcZh3zHZYNLgp__1y9hEyZpyYKT9VYlMoKoQoy44mthbgjDT-RegO4cxU-FdChMjFZMSlkPfAi2kQcqpAAHpBDfIMbvweWTfADweOe7LrqGEvVnFZ-A00ebTViYe8EQsXJB2U8lv7ZzhgxBeE_B4J_11z4rul29B4NcWBv8nYwaANxU5bFzz9p2MK2W7ng70-b3DAmy_9yX0q2CGTPkhJXcCf1MKEij7G3w9BPdy4GkNLLuEmCLJAh_p_isaMmODGo_IOmGd7Tg2-m49ecgza8Z0-jVcXtdayT-1i6J3RFN9hPF3xM1fpoeI4JP3Q-iLRokMmHKKtg';

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

        const image_api = 'https://api.sweet-vows.com/api/image/' + rCode;
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

    return (
        <div className="contentContainerMain">
            <div className="roomDetails">
                <div className="joinRoom">
                    <h1>LOVE LENS</h1>
                    <p>
                        Welcome to Jason's Room, Feel Free to add your pictures!
                    </p>
                    <p className="roomCode">Room Code: {rCode}</p>
                    <QRCode
                        className="qrcode"
                        delay={300}
                        value={
                            '18.142.147.231:3001/enterusername?room=' + rCode
                        }
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
    );
}
