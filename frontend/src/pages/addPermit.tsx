import {
  Box,
  Heading,
  Input,
  Button,
  Stack,
  Group,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const AddPermit = () => {
  const [vehicleName, setVehicleName] = useState<string>("");
  const [permitType, setPermitType] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");

  const handleSubmit = async () => {
    if (!vehicleName || !permitType || !expirationDate) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "https://parking.garyorsargos.xyz/api/setPermit",
        {
          permit: permitType,
          licence: vehicleName,
          expiration: expirationDate,
        },
        { withCredentials: true }, // Ensure cookies are sent with the request
      );

      if (response.status === 200) {
        alert("Permit added successfully!");
        // Reset form fields after success
        setVehicleName("");
        setPermitType("");
        setExpirationDate("");
      }
    } catch (error: any) {
      console.error("Error adding permit:", error);
      alert(
        error.response?.data?.error ||
          "An error occurred while adding the permit.",
      );
    }
  };

  return (
    <Box
      bg="white"
      shadow="sm"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      width="50vw"
      maxWidth="600px"
      height="65vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="5px"
      p="6"
    >
      <Heading as="h1" size="5xl" mb="6" color="black">
        Add Permit
      </Heading>
      <Stack width="100%" maxWidth="sm">
        {/* Vehicle Name Input */}
        <Input
          name="vehicleName"
          placeholder="Vehicle Name"
          size="lg"
          borderColor="gray.300"
          color="black"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
        />

        {/* Permit Type Title */}
        <Text fontSize="lg" color="gray.700" mb="2">
          Permit Type
        </Text>

        {/* Permit Type Button Group */}
        <Group width="100%" direction="row">
          {["D", "Emp", "R", "RL", "KP"].map((type) => (
            <Button
              key={type}
              onClick={() => setPermitType(type)}
              width="auto"
              flex="1"
              borderColor={permitType === type ? "skyblue" : "gray.300"}
              backgroundColor={permitType === type ? "skyblue" : "transparent"}
              color={permitType === type ? "white" : "gray.600"}
              _hover={{
                backgroundColor: permitType === type ? "skyblue" : "gray.100",
              }}
            >
              {type}
            </Button>
          ))}
        </Group>

        {/* Expiration Date Picker */}
        <Input
          name="expirationDate"
          type="date"
          size="lg"
          borderColor="gray.300"
          color="black"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />

        {/* Submit Button */}
        <Button
          bg="skyblue"
          color="white"
          size="lg"
          width="100%"
          onClick={handleSubmit}
        >
          Submit Permit
        </Button>
      </Stack>
    </Box>
  );
};

export default AddPermit;
