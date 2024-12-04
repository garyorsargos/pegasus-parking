import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Text } from "@chakra-ui/react";
import Card from "../components/ui/card";
import "../components/ui/styles/parkingFinder.css";

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
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [mapKey, setMapKey] = useState(0);
  const [garageData, setGarageData] = useState<GarageData[]>([]);
  const [userPermits, setUserPermits] = useState<string[]>([]);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [noPermitsMessage, setNoPermitsMessage] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const containerStyle = { width: "95%", height: "95%" };
  const center = { lat: 28.6024, lng: -81.2001 };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const clickedLat = event.latLng?.lat();
    const clickedLng = event.latLng?.lng();

    if (clickedLat && clickedLng) {
      setMarkerPosition({ lat: clickedLat, lng: clickedLng });

      try {
        const permitsResponse = await fetch("/api/getPermitStrings", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (permitsResponse.ok) {
          const permitsData = await permitsResponse.json();
          const permitList = permitsData.permits;
          setUserPermits(permitList);

          const fetchDistanceResponse = await fetch("/api/fetchDistance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              permitList,
              destinationLat: clickedLat,
              destinationLng: clickedLng,
            }),
          });

          if (fetchDistanceResponse.ok) {
            const distanceData: GarageData[] =
              await fetchDistanceResponse.json();
            setGarageData(distanceData);

            if (distanceData.length === 0) {
              setNoPermitsMessage(true);
            } else {
              setNoPermitsMessage(false);
            }
          }
        } else {
          setNoPermitsMessage(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNoPermitsMessage(true);
      }
    }
  };

  const findMatchingPermit = (
    garagePermits: string[],
    userPermits: string[],
  ) => {
    for (const permit of garagePermits) {
      if (userPermits.includes(permit)) {
        return permit;
      }
    }
    return "No Matching Permit";
  };

  useEffect(() => setMapKey((prev) => prev + 1), [location]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="parking-finder-container">
      <div className="sidebar">
        {garageData.length > 0 ? (
          garageData.map((garage, index) => (
            <Card
              key={index}
              garageName={garage.garage}
              permitType={`${findMatchingPermit(garage.permits, userPermits)} PERMIT`}
              travelTime={`${garage.time} minutes`}
              distanceInMiles={garage.distance.toFixed(2)}
              directionsLink={`https://www.google.com/maps?q=${garage.latitude},${garage.longitude}`}
            />
          ))
        ) : (
          <div>
            {noPermitsMessage ? (
              <Text color="black" fontWeight="medium">
                Please add a Permit First
              </Text>
            ) : (
              <Text color="black" fontWeight="medium">
                Please Select your Destination
              </Text>
            )}
          </div>
        )}
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
