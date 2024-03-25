import { Route, Routes } from 'react-router-dom';
import { NavigationPaths } from './NavigationPaths';
import Login from '../Web/Login';
import MainPage from '../Web/MainPage';
import AdminDashboard from '../Web/AdminDashboard';
import ManageCollage from "../Web/ManageCollage";
import EnterRoom from "../Mobile/EnterRoom";

export default function MainRoutes() {
    return (
        <Routes>
            <Route
                path={NavigationPaths.defaultPath}
                element={<Login />}
            ></Route>
            <Route
                path={NavigationPaths.mainPath}
                element={<MainPage />}
            ></Route>
            <Route
                path={NavigationPaths.adminDashboardPath}
                element={<AdminDashboard />}
            ></Route>
            <Route
                path={NavigationPaths.manageCollage}
                element={<ManageCollage />}
            ></Route>
            <Route
                path={NavigationPaths.inputName}
                element={<inputName />}
            ></Route>
        </Routes>
    );
}