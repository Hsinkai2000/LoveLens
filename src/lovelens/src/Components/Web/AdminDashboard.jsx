import '../Styles/AdminDashboard.css';
import NavBar from '../Routes/NavBar';
import { useState } from 'react';
import { onAuthStateChangedListener } from '../../utils/firebase.utils.js';
import axios from "axios";
export default function AdminDashboard() {
    console.log(onAuthStateChangedListener);

    const [name, setName] = useState('')

    const enterRoomName = async () => {
        console.log("enterRoomName")
        var x = document.getElementsByClassName("roomNamePopup");
        var y = document.getElementsByClassName("adminDashboardContainer");
        if (x[0].style.display === "none") {
            x[0].style.display = "block";
            y[0].style.filter = "blur(5px)";
        }
    };

    const createNewRoom = (e) => {
        e.preventDefault();
        console.log("createNewRoom")

        const newRoom = {
            "roomName": name
        };
        
        axios.post("http://localhost:3000/api/room/", 
        JSON.stringify(newRoom),
        {headers:{
            Authorization : "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjI1OTZmNTJmNTJlZDQ0MDQ5Mzk2YmU3ZGYzNGQyYzY0ZjQ1M2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG92ZWxlbnMtNTM1YmMiLCJhdWQiOiJsb3ZlbGVucy01MzViYyIsImF1dGhfdGltZSI6MTcxMjAzOTgzMSwidXNlcl9pZCI6IlQ5Tkg3dFNEUjloVklEQ09NVzBRVUpYRkFneTEiLCJzdWIiOiJUOU5IN3RTRFI5aFZJRENPTVcwUVVKWEZBZ3kxIiwiaWF0IjoxNzEyMDM5ODMxLCJleHAiOjE3MTIwNDM0MzEsImVtYWlsIjoidGVzdGVyMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0ZXIxMjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.EWEh0mxOWufXLlyGrV2gp4gZqwqg5O9QXh76nZDBe9HHbac6_OSYoKwDZGFKtJL7BBiBjgQkUqw2zK0Q_jZvyYW_Vhliz-MqWK2jp0d056ArPuHWxE0JYiqkUYhhGC_Ell-wARwNqPtpk4cqbH26tdKnmtt6zRdJpeJ7T1z0hvmuSKdA3KLVYZrz8BYy_Rux1e8NCSt1UojY4QPzt1-CV927ssvfwH5BElsdSGJRUmLHWWMdpq-fwInCe9l3K5ObXobf1Ir5SVR4xYv8vV1rWTXgXr3Bhk_9wk2Zjgkl-50qPdeHnOCkrD3u-yQWTMf0B9ft2-yKFGdqi78dWMQqow",
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
                            <tr>
                                <td>Jason's Wedding Collage</td>
                                <td>4836</td>
                                <td>50</td>
                                <td>19/05/2024</td>
                                <td className="actions">
                                    <a href="/main" rel="noopener" target="_blank">
                                        Start
                                    </a>
                                    <a href="/managecollage">Manage</a>
                                    <a href="/admindashboard">Delete</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
