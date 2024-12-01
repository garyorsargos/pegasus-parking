import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Card from '../components/ui/card';
import '../components/ui/styles/parkingFinder.css';

type GarageData = {
  garage: string;
  permits: string[];
  distance: number;
  time: string;
  polyline?: string;
};

const ParkingFinder: React.FC = () => {
  const location = useLocation();
  const [mapKey, setMapKey] = useState(0);
  const [garageData, setGarageData] = useState<GarageData[]>([]);
  const [userPermits, setUserPermits] = useState<string[]>([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCSxW_PMdBUPdNmdJYsp070JP0CRHrlJrA',
  });

  const containerStyle = { width: '95%', height: '95%' };
  const center = { lat: 28.6024, lng: -81.2001 };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const clickedLat = event.latLng?.lat();
    const clickedLng = event.latLng?.lng();

    if (clickedLat && clickedLng) {
      try {
        const permitsResponse = await fetch('/api/getPermitStrings', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (permitsResponse.ok) {
          const permitsData = await permitsResponse.json();
          const permitList = permitsData.permits;
          setUserPermits(permitList);

          const fetchDistanceResponse = await fetch('/api/fetchDistance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ permitList: permitList, destinationLat: clickedLat, destinationLng: clickedLng }),
          });

          if (fetchDistanceResponse.ok) {
            const distanceData = await fetchDistanceResponse.json();
            setGarageData(distanceData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const findMatchingPermit = (garagePermits: string[], userPermits: string[]) => {
    for (const permit of garagePermits) {
      if (userPermits.includes(permit)) {
        return permit;
      }
    }
    return 'No Matching Permit';
  };

  useEffect(() => setMapKey((prev) => prev + 1), [location]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="parking-finder-container">
      <div className="sidebar">
        {garageData.map((garage, index) => (
          <Card
            key={index}
            garageName={garage.garage}
            permitType={findMatchingPermit(garage.permits, userPermits)}
            travelTime={`${garage.time} minutes`}
            distanceInMiles={garage.distance.toFixed(2)}
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
          onClick={handleMapClick}
        />
      </div>
    </div>
  );
};

export default ParkingFinder;

