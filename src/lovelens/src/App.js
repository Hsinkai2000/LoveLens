import { BrowserView, MobileOnlyView } from 'react-device-detect';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainRoutes from './Components/Routes/MainRoutes';
import EnterRoom from './Components/Mobile/EnterRoom';

function App() {
  return (
    <div className="App">
      <MobileOnlyView>
        <EnterRoom></EnterRoom>
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