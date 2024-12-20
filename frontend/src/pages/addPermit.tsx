import {
  Box,
  Heading,
  Input,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMessage } from "../context/messageContext";
import { MessageTypes } from "../utils/messageTypes";

const AddPermit = () => {
  const [vehicleName, setVehicleName] = useState<string>("");
  const [permitType, setPermitType] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const { setMessage, showMessage, hideMessage } = useMessage();

  useEffect(() => {
    hideMessage("addPermitMessage");
    return () => hideMessage("addPermitMessage");
  }, []);

  const handleSubmit = async () => {
    if (!vehicleName || !permitType || !expirationDate) {
      alert("Please fill fields before submission!!!");
      return;
    }

    try {
      const response = await axios.post(
        "/api/setPermit",
        {
          permit: permitType,
          licence: vehicleName,
          expiration: expirationDate,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        if (response.data.message) {
          setMessage("addPermitMessage", response.data.message.type, response.data.message.message);
          showMessage("addPermitMessage");
        }
        window.location.href = "/user/permits";
      } else {
        if (response.data.message) {
          setMessage("addPermitMessage", response.data.message.type, response.data.message.message);
          showMessage("addPermitMessage");
        }
      }
    } catch (error: any) {
      setMessage("addPermitMessage", MessageTypes.ERROR, "An error occurred when trying to add permit.");
      showMessage("addPermitMessage");
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
        <Input
          name="vehicleName"
          placeholder="Vehicle Name"
          size="lg"
          borderColor="gray.300"
          color="black"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
        />

        <Text fontSize="lg" color="gray.700" mb="2">
          Permit Type
        </Text>

        <Box width="100%" display="flex" justifyContent="space-between">
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
        </Box>

        <Input
          name="expirationDate"
          type="date"
          size="lg"
          borderColor="gray.300"
          color="black"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />

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