import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/index';
import Login from './pages/login';
import Register from './pages/register';
import UserSettings from './pages/userSettings';
import MyPermits from './pages/myPermits';
import ParkingFinder from './pages/parkingFinder';
import { Navbar } from './components/ui/navbar';
import Card from './components/ui/card'; // Ensure the correct path
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Index />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/parking" element={<ParkingFinder />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/permits" element={<MyPermits />} />
          <Route path="/test-card" element={<Card
            garageName="GARAGE B"
            permitType="D PERMIT"
            distanceFromBuilding="0.1 MILES FROM CLASSROOM BUILDING 2"
            travelTime="8 min"
            distanceInMiles="3.2 MILES"
            directionsLink="https://www.google.com/maps"
          />} /> {/* Add a route for testing the Card component */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;