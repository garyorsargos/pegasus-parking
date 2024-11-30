import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap } from '@react-google-maps/api';
import Card from '../components/ui/card';
import '../components/ui/styles/parkingFinder.css';

const ParkingFinder: React.FC = () => {
  const location = useLocation();
  const [mapKey, setMapKey] = useState<number>(0);

  const parkingData = [
    { name: 'GARAGE B', permit: 'D PERMIT', distance: '0.1', buildingName: 'CLASSROOM BUILDING 2', time: '8 min', miles: '3.2' },
    { name: 'GARAGE F', permit: 'C PERMIT', distance: '80 METERS', buildingName: 'CLASSROOM BUILDING 2', time: '13 min', miles: '3.8' },
    { name: 'LOT G', permit: 'STAFF', distance: '1.3', buildingName: 'CLASSROOM BUILDING 2', time: '15 min', miles: '4.1' },
    { name: 'LIBRA GARAGE', permit: 'A PERMIT', distance: '1.6', buildingName: 'CLASSROOM BUILDING 2', time: '20 min', miles: '4.0' },
  ];

  const containerStyle = {
    width: '95%',
    height: '95%',
  };

  const center = {
    lat: 28.6024,
    lng: -81.2001, //THe main UCF coordinates
  };

  useEffect(() => {
    setMapKey(prevKey => prevKey + 1); 
  }, [location]);

  return (
    <div className="parking-finder-container">
      <div className="sidebar">
        {parkingData.map((garage, index) => (
          <Card
            key={index}
            garageName={garage.name}
            permitType={garage.permit}
            distanceFromBuilding={garage.distance}
            buildingName={garage.buildingName}
            travelTime={garage.time}
            distanceInMiles={garage.miles}
            directionsLink="https://www.google.com/maps"
          />
        ))}
      </div>

      <div className="main-content">
        <GoogleMap
          key={mapKey}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
        />
      </div>
    </div>
  );
};

export default ParkingFinder;

