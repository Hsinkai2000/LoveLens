import '../Styles/ManageCollage.css';
import enlarge from '../../images/enlarge.png';
import NavBar from '../Routes/NavBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
//import { LOCALSTORAGEKEY } from '../../LocalStorageKeys';
import { useLocation } from 'react-router-dom';
import JSZip from 'jszip';

export default function ManageCollage() {
    //const [data, setData] = useState([]);
    //const [isSelected, setIsSelected] = useState(false);
    const [imageData, setImageData] = useState([]);
    const location = useLocation();
    const rCode = location.search.split("=")[1].split("?")[0];
    const rName = decodeURI(location.search.split("=")[2]);
    const [imageList, setImageList] = useState([]);
    const selectedImages = [];

    const imagesDict = {}

    // const token = "Bearer " + JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).accessToken;
    // const uid = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).uid;

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

            // if (imageData) {
            //     imageData.forEach(image => {
            //         imagesDict[image] = "unselected";
            //     }); 

            //     if (imagesDict) {
            //         console.log(imagesDict);
            //     }
            // }

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

    const selected = (e, index) => {
        e.preventDefault();
        
        var x = document.getElementsByClassName('wedpic');
        var y = document.getElementsByClassName('image');
        //console.log(index);
        if (imagesDict[index] === "unselected" || imagesDict[index] === undefined) {
            x[index].style.scale = '95%';
            y[index].style.backgroundColor = '#CC4B54';
            x[index].style.backgroundColor = 'white';
            imagesDict[index] = "selected";
            selectedImages.push(index);
           
        }
        else {
            x[index].style.scale = '100%';
            imagesDict[index] = "unselected";
            x[index].style.backgroundColor = 'transparent';
            y[index].style.backgroundColor = 'transparent';
            selectedImages.splice(selectedImages.indexOf(index), 1);
        }

        // for (const [key, value] of Object.entries(imagesDict)) {
        //     if (value === "selected") {
        //         //console.log(key, value);
        //         selectedImages.push(key);
        //     }
        // }

       console.log(selectedImages);
    }

    const downloadSelected = (e) => {
        e.preventDefault();
        console.log("Download Selected: " + selectedImages);

        const downloadSelected = async () => {
            const zip = new JSZip();

            // Add Images to the zip file
            for (let i = 0; i < selectedImages.length; i++) {
                const response = await fetch(imageData[selectedImages[i]]);
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

        downloadSelected();
    }

    const deleteSelected = (e) => {
        e.preventDefault();
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
                    <button className="downloadPhotos" onClick={downloadSelected}>Download Selected Photo(s)</button>
                    <button className="deletePhotos" onClick={deleteSelected}>Delete Selected Photo(s)</button>
                </div>
                <button className="downloadCollage" onClick={downloadImage}>Download Collage</button>
            </div>
            <div className="contentContainerManage">
                <div className="photos">
                    {imageData.map((image, index) => (
                        <div className="image">
                            <img style={{}} className="wedpic" onClick={(e) => selected(e,index)} key={index} src={image} alt="Wedding 1" />
                            <a href={image} rel="noreferrer" target="_blank"><img className='enlarge' src={enlarge} alt='enlarge'></img></a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
