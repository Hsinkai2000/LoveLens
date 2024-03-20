import { useNavigate } from "react-router-dom"
import '../Styles/NavBar.css'
import { NavigationPaths } from './NavigationPaths'

const navigationConfig = [
    {
        routeName: "Admin Dashboard",
        link: NavigationPaths.adminDashboardPath,
    },
    {
        routeName: "Logout",
        link: NavigationPaths.defaultPath,
    }
]

export default function NavBar() {
    const navigation = useNavigate();

    return(
        <div className='navbarContainer'>
            <p className='prodName'>LOVE LENS</p>
            <div className='navbarOpts'>
                <p className='welcomeuser'>Hi, Jason</p>
                {navigationConfig.map((item, index) => {
                    return (
                        <button onClick={()=>navigation(item.link)}>{item.routeName}</button>
                    )
                })}
            </div>
        </div>
    )
}