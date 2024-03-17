//import { useNavigate } from "react-router-dom"
import '../Styles/NavBar.css'

const navigationConfig = [
    {
        routeName: "Logout",
    }
]

export default function NavBar() {
    //const navigation = useNavigate();

    return(
        <div className='navbarContainer'>
            <p className='prodName'>LOVE LENS</p>
            <div className='navbarOpts'>
                <p className='welcomeuser'>Hi, Jason</p>
                {navigationConfig.map((item, index) => {
                    return (
                        <p>{item.routeName}</p>
                    )
                })}
            </div>
        </div>
    )
}