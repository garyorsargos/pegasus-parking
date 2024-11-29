import { Component } from 'react';
import Card from '../components/ui/card'; // Ensure the correct path to the Card component
import '../components/ui/styles/parkingFinder.css'; // Import the CSS file for the ParkingFinder component

class ParkingFinder extends Component {
  render() {
    const parkingData = [
      { name: 'GARAGE B', permit: 'D PERMIT', distance: '0.1', buildingName:'CLASSROOM BUILDING 2', time: '8 min', miles: '3.2' },
      { name: 'GARAGE F', permit: 'C PERMIT', distance: '80 METERS', buildingName:'CLASSROOM BUILDING 2', time: '13 min', miles: '3.8' },
      { name: 'LOT G', permit: 'STAFF', distance: '1.3', buildingName:'CLASSROOM BUILDING 2', time: '15 min', miles: '4.1' },
      { name: 'LIBRA GARAGE', permit: 'A PERMIT', distance: '1.6', buildingName:'CLASSROOM BUILDING 2', time: '20 min', miles: '4.0' },
    ];

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

        {/* Main content for the map API*/}
        <div className="main-content">
          <h1 className="placeholder-text">Placeholder</h1> {/* Placeholder text, can delete later*/}
        </div>
      </div>
    );
  }
}

export default ParkingFinder;
