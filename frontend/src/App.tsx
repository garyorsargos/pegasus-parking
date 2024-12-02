import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LoadScript } from '@react-google-maps/api';
import Login from './pages/login';
import Register from './pages/register';
import UserSettings from './pages/userSettings';
import MyPermits from './pages/myPermits';
import ParkingFinder from './pages/parkingFinder';
import Navbar from './components/ui/navbar';
import AddPermit from "./pages/addPermit";
import './App.css';

const GOOGLE_MAPS_API_KEY = "AIzaSyCSxW_PMdBUPdNmdJYsp070JP0CRHrlJrA";

function App() {
  return (
    <BrowserRouter>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <Main />
      </LoadScript>
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  
  const showNavbar = location.pathname.startsWith('/user/');
  
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/parking" element={<ParkingFinder />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/user/permits" element={<MyPermits />} />
        <Route path="/user/addPermit" element={<AddPermit />} />
      </Routes>
    </>
  );
}

export default App;

