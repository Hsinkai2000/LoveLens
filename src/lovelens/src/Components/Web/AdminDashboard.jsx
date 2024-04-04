import '../Styles/AdminDashboard.css';
import NavBar from '../Routes/NavBar';
import { useState } from 'react';
import { onAuthStateChangedListener } from '../../utils/firebase.utils.js';
import axios from "axios";
import { useEffect } from 'react';
import dateFormat from 'dateformat';

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

    const token = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG92ZWxlbnMtNTM1YmMiLCJhdWQiOiJsb3ZlbGVucy01MzViYyIsImF1dGhfdGltZSI6MTcxMjIxMDMzOSwidXNlcl9pZCI6IlQ5Tkg3dFNEUjloVklEQ09NVzBRVUpYRkFneTEiLCJzdWIiOiJUOU5IN3RTRFI5aFZJRENPTVcwUVVKWEZBZ3kxIiwiaWF0IjoxNzEyMjEwMzM5LCJleHAiOjE3MTIyMTM5MzksImVtYWlsIjoidGVzdGVyMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0ZXIxMjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.OQaFTHRpD5bTkcZh3zHZYNLgp__1y9hEyZpyYKT9VYlMoKoQoy44mthbgjDT-RegO4cxU-FdChMjFZMSlkPfAi2kQcqpAAHpBDfIMbvweWTfADweOe7LrqGEvVnFZ-A00ebTViYe8EQsXJB2U8lv7ZzhgxBeE_B4J_11z4rul29B4NcWBv8nYwaANxU5bFzz9p2MK2W7ng70-b3DAmy_9yX0q2CGTPkhJXcCf1MKEij7G3w9BPdy4GkNLLuEmCLJAh_p_isaMmODGo_IOmGd7Tg2-m49ecgza8Z0-jVcXtdayT-1i6J3RFN9hPF3xM1fpoeI4JP3Q-iLRokMmHKKtg"

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
        axios.get("http://localhost:3000/api/room/T9NH7tSDR9hVIDCOMW0QUJXFAgy1", 
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
                                        <a href="/main" rel="noopener" target="_blank">
                                            Start
                                        </a>
                                        <a href="/managecollage">Manage</a>
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
