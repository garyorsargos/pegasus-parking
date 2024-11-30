import { Component } from 'react';
import Card from '../components/ui/card'; // Ensure the correct path to the Card component
import { GoogleMap, LoadScript } from '@react-google-maps/api'; // Import necessary components from @react-google-maps/api
import '../components/ui/styles/parkingFinder.css'; // Import the CSS file for the ParkingFinder component

class ParkingFinder extends Component {
  render() {
    const parkingData = [
      { name: 'GARAGE B', permit: 'D PERMIT', distance: '0.1', buildingName: 'CLASSROOM BUILDING 2', time: '8 min', miles: '3.2' },
      { name: 'GARAGE F', permit: 'C PERMIT', distance: '80 METERS', buildingName: 'CLASSROOM BUILDING 2', time: '13 min', miles: '3.8' },
      { name: 'LOT G', permit: 'STAFF', distance: '1.3', buildingName: 'CLASSROOM BUILDING 2', time: '15 min', miles: '4.1' },
      { name: 'LIBRA GARAGE', permit: 'A PERMIT', distance: '1.6', buildingName: 'CLASSROOM BUILDING 2', time: '20 min', miles: '4.0' },
    ];

    const containerStyle = {
      width: '95%',
      height: '95%', // Adjust the height as needed
    };

    const center = {
      lat: 28.6024,
      lng: -81.2001, // Coordinates of the initial center (UCF)
    };


    return (
      <div className="parking-finder-container">
        {/* Sidebar for parking information */}
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

        {/* Main content for the map API */}
        <div className="main-content">
          <LoadScript googleMapsApiKey="AIzaSyCSxW_PMdBUPdNmdJYsp070JP0CRHrlJrA">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
            >
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    );
  }
}

export default ParkingFinder;

