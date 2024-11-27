import { Component } from "react";
import { Box, Text, Flex, Spacer, Button, Badge } from "@chakra-ui/react";

interface CardProps {
  garageName: string;
  permitType: string;
  distanceFromBuilding: string;
  travelTime: string;
  distanceInMiles: string;
  directionsLink?: string;
}

export class Card extends Component<CardProps> {
  render() {
    const {
      garageName,
      permitType,
      distanceFromBuilding,
      travelTime,
      distanceInMiles,
      directionsLink,
    } = this.props;

    console.log("Card props:", this.props); // Check the props

    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="6"
        boxShadow="lg"
        bg="white"
        maxW="sm"
      >
        <Flex align="center" mb="4">
          <Text fontSize="xl" fontWeight="bold" color="black">{garageName}</Text>
          <Spacer />
          <Badge
            colorScheme={
              permitType.startsWith("D") ? "blue" : permitType.startsWith("C") ? "purple" : "gray"
            }
            px="2"
            py="1"
            borderRadius="md"
          >
            {permitType}
          </Badge>
        </Flex>
        <Text fontSize="sm" color="gray.500" mb="2">
          {distanceFromBuilding}
        </Text>
        <Flex align="center" mb="1">
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="green.400">
              {travelTime}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {distanceInMiles}
            </Text>
          </Box>
          <Spacer />
        </Flex>
        <Flex justifyContent="flex-end">
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => window.open(directionsLink, "_blank")}
          >
            Directions
          </Button>
        </Flex>
      </Box>
    );
  }
}

export default Card;