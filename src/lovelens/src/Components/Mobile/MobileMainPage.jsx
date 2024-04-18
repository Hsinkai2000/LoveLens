import '../Styles/MobileMainPage.css'
import wedpic from '../../images/wed1.png';
import tape1 from '../../images/tape.svg';
import tape2 from '../../images/tape.svg';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import ReactCrop from 'react-image-crop';

export default function MobileMainPage() {

    const [imageData, setImageData] = useState([]);
    const location = useLocation();
    const rCode = location.search.split("=")[1].split("?")[0];

    // const [image, setImage] = useState(null);
    // const [crop, setCrop] = useState({ aspect: 16 / 9 });

    const fetchData = async () => {
        const image_api = ("http://192.168.2.119:3000/api/image/" + rCode);
        await axios.get(image_api,
        {headers:{
            "Content-Type" : "application/json"
        }})
        .then(image_res => {
            const {room} = image_res.data;
            setImageData(room);
        })
        .catch((err) => {
            console.log(err.message);
        }); 
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fileUpload = event => {
        var formData = new FormData();

        formData.append("room_code", rCode);
        formData.append("image", event.target.files[0]);

        axios.post("http://192.168.2.119:3000/api/image/upload", 
        formData,
        {headers:{
            "Content-Type" : "multipart/form-data"
        }})
        .then((res) => {
            console.log("image uploaded");
            window.location.reload();
         })
         .catch((err) => {
            console.log(err.message);
         });    

    }
    
    return(
        <div className='mobileMainContainer' style={{}}>
            <div className='mainHeaderContainer'>
                <div className='headerLoveLens'><p className='prodName'>LOVE LENS</p></div>
                <div className='welcomeMsg'><p>Welcome to Room {rCode}, Feel Free to add your pictures!</p></div>
            </div>
            <div className='mobileMainContent'>
                <div className='photoList'>
                {[...imageData].reverse().map((image) => (
                    <div className='wrapImage'>
                        <div className="imageBox">
                            <img className="wedpic" src={image} key={image} alt="Wedding 1" />
                            <img className="tape1" src={tape1} key={{image}+'t1'} alt="Tape" />
                            <img className="tape2" src={tape2} key={{image}+'t2'} alt="Tape" />
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div>
                <button className='addPicButton'>&#43;</button>
                <input className='chooseFile' type="file" accept="image/*" onChange={fileUpload} />
            </div>
        </div>
    )
}

// {image && (
//     <ReactCrop
//       src={URL.createObjectURL(image)} // Create temporary URL for selected image
//       onImageLoaded={setCrop} // Update crop state on image load (optional)
//       onChange={setCrop}
//       style={{ maxHeight: 400 }} // Optional: Set styling for the cropping area
//     />
// )}