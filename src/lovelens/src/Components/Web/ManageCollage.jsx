import '../Styles/ManageCollage.css';
import wed1 from '../../images/wed1.png';
import tape1 from '../../images/tape.svg';
import tape2 from '../../images/tape.svg';
import NavBar from '../Routes/NavBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LOCALSTORAGEKEY } from '../../LocalStorageKeys';
import { useLocation } from 'react-router-dom';
import JSZip from 'jszip';

export default function ManageCollage() {
    const [data, setData] = useState([]);
    const [imageData, setImageData] = useState([]);
    const location = useLocation();
    const rCode = location.search.split("=")[1].split("?")[0];
    const rName = decodeURI(location.search.split("=")[2]);

    const token = "Bearer " + JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).accessToken;
    const uid = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).uid;

    const fetchData = async () => {
        // const api = ("http://localhost:3000/api/room/" + uid).toString();
        // axios.get(api, 
        // {headers:{
        //     Authorization : token,
        //     "Content-Type" : "application/json"
        // }})
        // .then(res => {
        //     const {rooms} = res.data;
        //     setData(rooms);

        //     console.log("Data: " + data);
        // })
        // .catch((err) => {
        //     console.log(err.message);
        // });   

        const image_api = ("http://localhost:3000/api/image/" + rCode);
        axios.get(image_api,
        {headers:{
            "Content-Type" : "application/json"
        }})
        .then(image_res => {
            const {room} = image_res.data;
            setImageData(room);

            console.log("Image Data: " + imageData);
        })
        .catch((err) => {
            console.log(err.message);
        }); 
    };

    useEffect(() => {
        fetchData();
    }, []);

    const downloadImage = async () => {
        const zip = new JSZip();

        console.log("Image:" + imageData + "/n");
        // Add Images to the zip file
        for (let i = 0; i < imageData.length; i++) {
            const response = await fetch(imageData[i]);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            zip.file(rCode + "_" + i + ".png", blob);
        }

        // Generate the zip file
        const zipData = await zip.generateAsync({type: "blob", streamFiles: true,});

        // Create a download link for the zip file
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(zipData);
        link.download = "Pictures.zip";
        link.click();
    }

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
                        <p>{rName}</p>
                    </div>
                    <div>
                        <p>Room Code: {rCode}</p>
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
                <button className="downloadCollage" onClick={downloadImage}>Download Collage</button>
            </div>
            <div className="contentContainerManage">
                <div className="photos">
                    {imageData.map((image) => (
                        <div className="image">
                            <img className="wedpic" key={image} src={image} alt="Wedding 1" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
