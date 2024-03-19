import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainRoutes from './Components/Routes/MainRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <MainRoutes></MainRoutes>
      </BrowserRouter>
    </div>
  );
}

export default App;
