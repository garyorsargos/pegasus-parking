import { useEffect, useState } from "react";
import { Box, Flex, Badge, Text, Button, Heading } from "@chakra-ui/react";

interface Permit {
  _id: string;
  permit: string;
  licence: string;
  expiration: string;
}

const UserPermits = () => {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const response = await fetch("/api/getPermits");
        const data = await response.json();

        if (response.ok) {
          setPermits(data.permits);
        } else {
          setError(data.error || "An error occurred while fetching permits.");
        }
      } catch (err) {
        setError("An error occurred while fetching permits.");
      } finally {
        setLoading(false);
      }
    };

    fetchPermits();
  }, []);

  if (loading) {
    return <Text>Loading permits...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box bg="gray.100" p={5} minH="100vh">
      <Box bg="white" borderRadius="md" p={6} mt={5} boxShadow="md">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="lg" color="black">
            My Permits
          </Heading>
          <Button bg="green.500" _hover={{ bg: "green.600" }} color="white">
            Add a Permit
          </Button>
        </Flex>

        {/* Render the user's permits */}
        <Flex direction="column" gap={4}>
          {permits.map((permit) => (
            <Box
              key={permit._id}
              bg="gray.50"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontWeight="bold" color="black">
                    {permit.permit}
                  </Text>
                  <Badge bg="blue.600" color="white" mt={1}>
                    {permit.licence}
                  </Badge>
                  <Text fontSize="sm" color="gray.600" mt={2}>
                    Expires:{" "}
                    <Text as="span" color="green.500">
                      {permit.expiration}
                    </Text>
                  </Text>
                </Box>
                <Flex gap={3}>
                  <Button
                    size="sm"
                    bg="yellow.400"
                    _hover={{ bg: "yellow.500" }}
                  >
                    Set as Default
                  </Button>
                  <Button size="sm" bg="red.400" _hover={{ bg: "red.500" }}>
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

export default UserPermits;
