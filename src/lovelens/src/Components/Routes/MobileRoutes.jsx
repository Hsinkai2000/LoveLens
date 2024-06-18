import { Route, Routes } from 'react-router-dom';
import { NavigationPaths } from './NavigationPaths';
import EnterRoom from "../Mobile/EnterRoom";
import EnterUsername from '../Mobile/EnterUsername';

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
        </Routes>
    );
}