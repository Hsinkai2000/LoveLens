import { Route, Routes } from 'react-router-dom';
import { NavigationPaths } from './NavigationPaths';
import Login from '../Web/Login';
import ManageCollage from "../Web/ManageCollage";

export default function MainRoutes() {
    return (
        <Routes>
            <Route
                path={NavigationPaths.loginPath}
                element={<Login />}
            ></Route>
            <Route
                path={NavigationPaths.manageCollage}
                element={<ManageCollage />}
            ></Route>
        </Routes>
    );
}