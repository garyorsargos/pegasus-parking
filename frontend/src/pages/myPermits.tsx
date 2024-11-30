import { Box, Flex, Badge, Text, Heading, Button } from "@chakra-ui/react";

// Define the PermitType type with the specific string values
type PermitType = "D PERMIT" | "A PERMIT" | "STAFF";

// Define the structure of each permit
interface Permit {
  name: string;
  type: PermitType;  // Explicitly use PermitType for 'type'
  color: string;
}

const MyPermits = () => {
  // Define permits with the explicit PermitType type for 'type'
  const permits: Permit[] = [
    { name: "2012 KIA FORTE", type: "D PERMIT", color: "blue" },
    { name: "2020 KAWASAKI NINJA 400", type: "A PERMIT", color: "red" },
    { name: "2015 RAM 1500", type: "D PERMIT", color: "green" },
    { name: "1998 KIA SOUL", type: "STAFF", color: "blue" },
  ];

  // Function to map the permit type to a Badge background color
  const getBadgeColor = (type: PermitType) => {
    switch (type) {
      case "D PERMIT":
        return "green.600";  // D PERMIT -> green.600
      case "A PERMIT":
        return "red.600";  // A PERMIT -> red.600
      case "STAFF":
        return "blue.600";  // STAFF -> blue.600
      default:
        return "gray.600"; // Default color if needed
    }
  };

  return (
    <Box bg="gray.100" p={5} minH="100vh">
      {/* Main Content */}
      <Box bg="white" borderRadius="md" p={6} mt={5} boxShadow="md">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="lg" color="black">My Permits</Heading> {/* Black color for the heading */}
          <Button bg="green.500" _hover={{ bg: "green.600" }} color="white"> {/* Green color for Add a Permit */}
            Add a Permit
          </Button>
        </Flex>

        {/* Permit List */}
        <Flex direction="column" gap={4}>
          {permits.map((permit, index) => (
            <Box
              key={index}
              bg="gray.50"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontWeight="bold" color="black">{permit.name}</Text> {/* Black color for car model */}
                  <Badge bg={getBadgeColor(permit.type)} color="white" mt={1}> {/* Using bg instead of colorScheme */}
                    {permit.type}
                  </Badge>
                  <Text fontSize="sm" color="gray.600" mt={2}>
                    Expires: <Text as="span" color="green.500">3 Months</Text>
                  </Text>
                  <Text fontSize="xs" color="gray.500">November 10th, 2025</Text>
                </Box>
                <Flex gap={3}>
                  <Button size="sm" bg="yellow.400" _hover={{ bg: "yellow.500" }}> {/* Yellow color for Set as Default */}
                    Set as Default
                  </Button>
                  <Button size="sm" bg="red.400" _hover={{ bg: "red.500" }}> {/* Red color for Delete */}
                    Delete
                  </Button>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default MyPermits;
