import { Component } from "react";
import { Box, Text, Flex, Spacer, Button, Badge } from "@chakra-ui/react";
import { MdDirections } from "react-icons/md";
import { FaIdBadge } from "react-icons/fa";
import './styles/card.css';

interface CardProps {
  garageName: string;
  permitType: string;
  distanceFromBuilding: string;
  buildingName: string;
  travelTime: string;
  distanceInMiles: string;
  directionsLink?: string;
}

export class Card extends Component<CardProps> {
  getTravelTimeColor(travelTime: string) {
    const time = parseInt(travelTime);
    if (time < 10) {
      return 'green';
    } else if (time >= 10 && time < 20) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  getPermitTypeColor(permitType: string) {
    switch (permitType) {
      case "D PERMIT":
        return "blue";
      case "C PERMIT":
        return "purple";
      case "STAFF":
        return "seaGreen";
      case "A PERMIT":
        return "red";
      case "B PERMIT":
        return "orange";
      default:
        return "gray";
    }
  }

  render() {
    const {
      garageName,
      permitType,
      distanceFromBuilding,
      buildingName,
      travelTime,
      distanceInMiles,
      directionsLink,
    } = this.props;

    console.log("Card props:", this.props); // Check the props

    return (
      <Box className="card-container">
        <Flex className="card-header">
          <Text className="card-title">{garageName}</Text>
          <Spacer />
          <Badge 
            className="card-badge"
            bg={this.getPermitTypeColor(permitType)} // Set background color
            color="white" // Set text color to white for better contrast

          > 
            {permitType} <FaIdBadge />
          </Badge> 
        </Flex>
        <Text className="card-distance">{distanceFromBuilding + " FROM " + buildingName}</Text>
        <Flex className="card-info">
          <Box>
            <Text
              className="card-travel-time"
              style={{ color: this.getTravelTimeColor(travelTime) }}
            >
              {travelTime}
            </Text>
            <Text className="card-distance-miles">{distanceInMiles + " MILES"}</Text>
          </Box>
          <Spacer />
          <Button
            className="card-button"
            onClick={() => window.open(directionsLink, "_blank")}
            mt="3"
          >
            Directions <MdDirections />
          </Button>
        </Flex>
      </Box>
    );
  }
}

export default Card;
