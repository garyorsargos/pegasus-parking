import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from './pages/index';
import Login from './pages/login';
import Register from './pages/register';
import UserSettings from './pages/userSettings';
import MyPermits from './pages/myPermits';
import ParkingFinder from './pages/parkingFinder';
import { Navbar } from './components/ui/navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  
  // Check if the current path starts with "/user/"
  const showNavbar = location.pathname.startsWith('/user/');
  
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/parking" element={<ParkingFinder />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/user/permits" element={<MyPermits />} />
        
      </Routes>
    </>
  );
}

export default App;

