import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LoadScript } from '@react-google-maps/api';
import Login from './pages/login';
import Register from './pages/register';
import UserSettings from './pages/userSettings';
import MyPermits from './pages/myPermits';
import ParkingFinder from './pages/parkingFinder';
import Navbar from './components/ui/navbar';
import AddPermit from "./pages/addPermit";
import ProtectedRoute from "./pages/protectedRoute";
import './App.css';
import EditPermit from "./pages/editPermit";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user/parking" element={<ParkingFinder />} />
          <Route path="/user/settings" element={<UserSettings />} />
          <Route path="/user/permits" element={<MyPermits />} />
          <Route path="/user/addPermit" element={<AddPermit />} />
          <Route path="/user/editPermit/:permitId" element={<EditPermit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

