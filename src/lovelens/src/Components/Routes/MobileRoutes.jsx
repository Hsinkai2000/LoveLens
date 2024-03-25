import { Route, Routes } from 'react-router-dom';
import { NavigationPaths } from './NavigationPaths';
import EnterRoom from "../Mobile/EnterRoom";
import MobileMainPage from '../Mobile/MobileMainPage';

export default function MobileRoutes() {
    return (
        <Routes>
            <Route
                path={NavigationPaths.enterRoomPath}
                element={<EnterRoom />}
            ></Route>
            <Route
                path={NavigationPaths.mobileMainPath}
                element={<MobileMainPage />}
            ></Route>
        </Routes>
    );
}