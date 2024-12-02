import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Card from '../components/ui/card';
import '../components/ui/styles/parkingFinder.css';

type GarageInfo = {
  name: string;
  permits: string[];
  distanceInMiles: number;
  travelTime: string;
  latitude: number;
  longitude: number;
  polyline?: string;
};

const ParkingFinder: React.FC = () => {
  const location = useLocation();
  const [mapRenderKey, setMapRenderKey] = useState(0);
  const [garages, setGarages] = useState<GarageInfo[]>([]);
  const [userPermits, setUserPermits] = useState<string[]>([]);
  const [markerLocation, setMarkerLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCSxW_PMdBUPdNmdJYsp070JP0CRHrlJrA',
  });

  const mapCenter = { lat: 28.6024, lng: -81.2001 };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    if (!lat || !lng) return;

    setMarkerLocation({ lat, lng });

    try {
      const permitsResponse = await fetch('/api/getPermitStrings');
      if (permitsResponse.ok) {
        const permitsData = await permitsResponse.json();
        setUserPermits(permitsData.permits);

        const distanceResponse = await fetch('/api/fetchDistance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            permitList: permitsData.permits,
            destinationLat: lat,
            destinationLng: lng,
          }),
        });

        if (distanceResponse.ok) {
          const garagesData: GarageInfo[] = await distanceResponse.json();
          setGarages(garagesData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const findMatchingPermit = (garagePermits: string[]) =>
    garagePermits.find((permit) => userPermits.includes(permit)) || 'No Matching Permit';

  useEffect(() => {
    setMapRenderKey((prevKey) => prevKey + 1);
  }, [location]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="parking-finder-container">
      <div className="sidebar">
        {garages.map((garage, index) => (
          <Card
            key={index}
            garageName={garage.name}
            permitType={`${findMatchingPermit(garage.permits)} PERMIT`}
            travelTime={`${garage.travelTime} minutes`}
            distanceInMiles={garage.distanceInMiles.toFixed(2)}
            directionsLink={`https://www.google.com/maps?q=${garage.latitude},${garage.longitude}`}
          />
        ))}
      </div>
      <div className="main-content">
        <GoogleMap
          key={mapRenderKey}
          mapContainerStyle={{ width: '95%', height: '95%' }}
          center={mapCenter}
          zoom={16}
          onClick={handleMapClick}
        >
          {markerLocation && <Marker position={markerLocation} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default ParkingFinder;

