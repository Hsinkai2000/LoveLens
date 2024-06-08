import { Route, Routes } from 'react-router-dom';
import { NavigationPaths } from './NavigationPaths';
import LandingPage from '../LandingPage';
import Login from '../Web/Login';

export default function AllRoutes() {
    return (
        <Routes>
            <Route
                path={NavigationPaths.landingPath}
                element={<LandingPage />}
            ></Route>
            <Route
                path={NavigationPaths.loginPath}
                element={<Login />}
            ></Route>
        </Routes>
    );
}