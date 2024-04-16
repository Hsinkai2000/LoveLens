import '../Styles/AdminDashboard.css';
import NavBar from '../Routes/NavBar';
import { useState } from 'react';
import { onAuthStateChangedListener } from '../../utils/firebase.utils.js';
import axios from "axios";
import { useEffect } from 'react';
import dateFormat from 'dateformat';
import { LOCALSTORAGEKEY } from '../../LocalStorageKeys.jsx';

export default function AdminDashboard() {
    console.log(onAuthStateChangedListener);

    const [name, setName] = useState('')
    const [data, setData] = useState([])

    const enterRoomName = async () => {
        console.log("enterRoomName")
        var x = document.getElementsByClassName("roomNamePopup");
        var y = document.getElementsByClassName("adminDashboardContainer");
        if (x[0].style.display === "none") {
            x[0].style.display = "block";
            y[0].style.filter = "blur(5px)";
        }
    };

    const token = "Bearer " + JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).accessToken;
    const uid = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).uid;
    //console.log("token: " + token);
    //console.log("uid: " + uid);

    const createNewRoom = (e) => {
        e.preventDefault();
        console.log("createNewRoom")

        const newRoom = {
            "roomName": name
        };
        
        axios.post("http://localhost:3000/api/room/", 
        JSON.stringify(newRoom),
        {headers:{
            Authorization : token,
            "Content-Type" : "application/json"
        }})
        .then((res) => {
            setName('');
         })
         .catch((err) => {
            console.log(err.message);
         });     

        var x = document.getElementsByClassName("roomNamePopup");
        var y = document.getElementsByClassName("adminDashboardContainer");
        if (x[0].style.display === "block") {
            x[0].style.display = "none";
            y[0].style.filter = "none";
        }
        window.location.reload();
    };

    const cancelCreation = async () => {
        console.log("createNewRoom")
        var x = document.getElementsByClassName("roomNamePopup");
        var y = document.getElementsByClassName("adminDashboardContainer");

        if (x[0].style.display === "block") {
            x[0].style.display = "none";
            y[0].style.filter = "none";
        }
    };

    const fetchData = async () => {
        const api = ("http://localhost:3000/api/room/" + uid).toString();
        axios.get(api, 
        {headers:{
            Authorization : token,
            "Content-Type" : "application/json"
        }})
        .then(res => {
            const {rooms} = res.data;
            setData(rooms);
        })
        .catch((err) => {
            console.log(err.message);
        });   
    };

    useEffect(() => {
        fetchData();
    }, []);
    

    return (
        <div>
            <div style={{display: 'none'}} className='roomNamePopup'>
                <button className='cancel' onClick={cancelCreation}>X</button>
                <label>Enter Room Name:</label>
                <br></br>
                <br></br>
                <br></br>
                <input onChange={e=>setName(e.target.value)}></input>
                <br></br>
                <br></br>
                <br></br>
                <button className='roomCreation' onClick={createNewRoom}>Create Room</button>
            </div>
            <div style={{}} className='adminDashboardContainer'>
                <NavBar></NavBar>
                <div className="contentContainerAdmin">
                    <div className="headerSection">
                        <div className="descSection">
                            <h1>Manage Collages</h1>
                            <span>
                                Create a room for image collage. Engage your
                                audience effortlessly!
                            </span>
                        </div>
                        <div className="addSection">
                            <div className="emptyContainerAdmin"></div>
                            <button onClick={enterRoomName}>&#43;</button>
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <table className="roomTable">
                            <tr className="tableHeaders">
                                <th>Collage Name</th>
                                <th>Room Code</th>
                                <th>Number of Images</th>
                                <th>Creation Date</th>
                                <th className="actionHeader">Action</th>
                            </tr>
                            {data.map((room) => (
                                <tr>
                                    <td>{room.name}</td>
                                    <td>{room.room_code}</td>
                                    <td>{room.num_of_pics}</td>
                                    <td>{dateFormat(room.creation_date, "dd/mm/yyyy")}</td>
                                    <td className="actions">
                                        <a href={"/main?room=" + room.room_code} rel="noreferrer" target="_blank">
                                            Start
                                        </a>
                                        <a href={"/managecollage?room=" + room.room_code + "?name=" + room.name}>Manage</a>
                                        <a href="/admindashboard">Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
