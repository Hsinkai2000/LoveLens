import { BrowserView, MobileOnlyView } from 'react-device-detect';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainRoutes from './Components/Routes/MainRoutes';
import MobileRoutes from './Components/Routes/MobileRoutes';

function App() {
    return (
        <div className="App">
            <MobileOnlyView>
                <BrowserRouter>
                    <MobileRoutes></MobileRoutes>
                </BrowserRouter>
            </MobileOnlyView>
            <BrowserView>
                <BrowserRouter>
                    <MainRoutes></MainRoutes>
                </BrowserRouter>
            </BrowserView>
        </div>
    );
}

export default App;

// <BrowserRouter>
// <MainRoutes></MainRoutes>
// </BrowserRouter>
