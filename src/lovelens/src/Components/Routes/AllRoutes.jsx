import { Route, Routes } from 'react-router-dom';
import { NavigationPaths } from './NavigationPaths';
import LandingPage from '../LandingPage';

export default function AllRoutes() {
    return (
        <Routes>
            <Route
                path={NavigationPaths.landingPath}
                element={<LandingPage />}
            ></Route>
        </Routes>
    );
}