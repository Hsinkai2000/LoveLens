import { useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css';
import { NavigationPaths } from './NavigationPaths';
import { signOutUser } from '../../utils/firebase.utils';

const navigationConfig = [
    {
        routeName: 'Admin Dashboard',
        link: NavigationPaths.adminDashboardPath
    },
    {
        routeName: 'Logout',
        link: NavigationPaths.defaultPath
    }
];

export default function NavBar() {
    const navigation = useNavigate();
    const logoutHandler = () => {
        signOutUser();
        navigation(NavigationPaths.defaultPath);
    };

    return (
        <div className="navbarContainer">
            <p className="prodName">LOVE LENS</p>
            <div className="navbarOpts">
                <p className="welcomeuser">Hi, Jason</p>
                {navigationConfig.map((item, index) => {
                    return (
                        <button
                            onClick={() => {
                                if (item.link == NavigationPaths.defaultPath) {
                                    logoutHandler();
                                } else {
                                    navigation(
                                        NavigationPaths.adminDashboardPath
                                    );
                                }
                            }}
                        >
                            {item.routeName}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
