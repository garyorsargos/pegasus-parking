import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Card from '../components/ui/card';
import { useMessage } from '../context/messageContext';
import { MessageTypes } from '../utils/messageTypes';
import '../components/ui/styles/parkingFinder.css';

type GarageData = {
  garage: string;
  permits: string[];
  distance: number;
  time: string;
  latitude: number;
  longitude: number;
  polyline?: string;
};

const ParkingFinder: React.FC = () => {
  const location = useLocation();
  const [mapKey, setMapKey] = useState(0);
  const [garageData, setGarageData] = useState<GarageData[]>([]);
  const [userPermits, setUserPermits] = useState<string[]>([]);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCSxW_PMdBUPdNmdJYsp070JP0CRHrlJrA',
  });
  const { setMessage, showMessage } = useMessage();

  const containerStyle = { width: '95%', height: '95%' };
  const center = { lat: 28.6024, lng: -81.2001 };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const clickedLat = event.latLng?.lat();
    const clickedLng = event.latLng?.lng();

    if (clickedLat && clickedLng) {
      setMarkerPosition({ lat: clickedLat, lng: clickedLng });

      try {
        const permitsResponse = await fetch('/api/getPermitStrings', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        const permitsData = await permitsResponse.json();

        if (permitsResponse.ok && permitsData.success) {
          const permitList = permitsData.data;
          setUserPermits(permitList);

          const fetchDistanceResponse = await fetch('/api/fetchDistance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ permitList, destinationLat: clickedLat, destinationLng: clickedLng }),
          });

          const distanceData = await fetchDistanceResponse.json();

          if (fetchDistanceResponse.ok && distanceData.success) {
            setGarageData(distanceData.data);
          } else {
            setMessage("fetchDistanceMessage", distanceData.message?.type || MessageTypes.ERROR, distanceData.message?.message || "Failed to fetch distance data.");
            showMessage("fetchDistanceMessage");
          }
        } else {
          setMessage("fetchPermitsMessage", permitsData.message?.type || MessageTypes.ERROR, permitsData.message?.message || "Failed to fetch permits.");
          showMessage("fetchPermitsMessage");
        }
      } catch (error) {
        setMessage("fetchDataMessage", MessageTypes.ERROR, "Error fetching data. Please try again.");
        showMessage("fetchDataMessage");
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
            permitType={`${findMatchingPermit(garage.permits, userPermits)} PERMIT`}
            travelTime={`${garage.time} minutes`}
            distanceInMiles={garage.distance.toFixed(2)}
            directionsLink={`https://www.google.com/maps?q=${garage.latitude},${garage.longitude}`}
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
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default ParkingFinder;