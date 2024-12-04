import { useEffect, useState } from "react";
import { Box, Flex, Badge, Text, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
          setError(data.error || "Error occurred while fetching permits.");
        }
      } catch (err) {
        setError("Unable to fetch permits. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPermits();
  }, []);

  const handleDeletePermit = async (permitId: string) => {
    try {
      const response = await fetch("/api/deletePermit", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permitId }),
      });

      const data = await response.json();

      if (response.ok) {
        setPermits(permits.filter((permit) => permit._id !== permitId));
      } else {
        setError(data.error || "Failed to delete the permit. Please try again.");
      }
    } catch (err) {
      setError("There was an issue deleting the permit.");
    }
  };

  if (loading) {
    return <Text>Loading your permits...</Text>;
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
          <Link to="/user/addPermit">
            <Button bg="green.500" _hover={{ bg: "green.600" }} color="white">
              Add a Permit
            </Button>
          </Link>
        </Flex>

        <Flex direction="column" gap={4}>
          {permits.length > 0 ? (
            permits.map((permit) => (
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
                      {permit.licence}
                    </Text>
                    <Badge bg="blue.600" color="white" mt={1}>
                      {permit.permit}
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
                      bg="red.400"
                      _hover={{ bg: "red.500" }}
                      onClick={() => handleDeletePermit(permit._id)}
                    >
                      Delete
                    </Button>
                    <Link to={`/user/editPermit/${permit._id}`}>
                      <Button
                        size="sm"
                        bg="blue.400"
                        _hover={{ bg: "blue.500" }}
                      >
                        Edit
                      </Button>
                    </Link>
                  </Flex>
                </Flex>
              </Box>
            ))
          ) : (
            <Text>No permits found. Please add some permits.</Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default UserPermits;

