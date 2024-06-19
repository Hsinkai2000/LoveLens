import { Route, Routes } from 'react-router-dom';
import { NavigationPaths } from './NavigationPaths';
import EnterRoom from "../Mobile/EnterRoom";
import EnterUsername from '../Mobile/EnterUsername';
import GuestMain from '../Mobile/GuestMain';

export default function MobileRoutes() {
    return (
        <Routes>
            <Route
                path={NavigationPaths.enterRoomPath}
                element={<EnterRoom />}
            ></Route>
            <Route
                path={NavigationPaths.enterUsernamePath}
                element={<EnterUsername/>}
            ></Route>
            <Route
                path={NavigationPaths.guestMainPath}
                element={<GuestMain/>}
            ></Route>
        </Routes>
    );
}