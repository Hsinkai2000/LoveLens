import '../Styles/AdminDashboard.css'
import NavBar from '../Routes/NavBar'

export default function AdminDashboard() {
    return(
        <div>
            <NavBar></NavBar>
            <div className='contentContainer'>
                <div className='headerSection'>
                    <div className='descSection'>
                        <h1>Manage Collages</h1>
                        <span>Create a room for image collage. Engage your audience effortlessly!</span>
                    </div>
                    <div className='addSection'>
                        <div className='emptyContainer'></div>
                        <span>&#43;</span>
                    </div>
                </div>
                <hr></hr>
                <div>
                    <table className='roomTable'>
                        <tr className='tableHeaders'>
                            <th>Collage Name</th>
                            <th>Room Code</th>
                            <th>Number of Images</th>
                            <th>Creation Date</th>
                            <th className='actionHeader'>Action</th>
                        </tr>
                        <tr>
                            <td>Jason's Wedding Collage</td>
                            <td>4836</td>
                            <td>50</td>
                            <td>19/05/2024</td>
                            <td className='actions'>
                                <a href='http://localhost:3000'>Start</a>
                                <a href='http://localhost:3000'>View</a>
                                <a href='http://localhost:3000'>Edit</a>
                                <a href='http://localhost:3000'>Delete</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}