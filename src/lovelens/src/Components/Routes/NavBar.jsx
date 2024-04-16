import { useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css';
import { NavigationPaths } from './NavigationPaths';
import { signOutUser } from '../../utils/firebase.utils';
import { LOCALSTORAGEKEY } from '../../LocalStorageKeys';

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

    let displayName = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).displayName;
    const email = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).email;

    if (displayName == null) {
        displayName = email.split("@")[0];
    }

    const logoutHandler = () => {
        signOutUser();
        navigation(NavigationPaths.defaultPath);
    };

    return (
        <div className="navbarContainer">
            <p className="prodName">LOVE LENS</p>
            <div className="navbarOpts">
                <p className="welcomeuser">Hi, {displayName}</p>
                {navigationConfig.map((item, index) => {
                    return (
                        <button
                            key={item.routeName}
                            onClick={() => {
                                if (item.link === NavigationPaths.defaultPath) {
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
