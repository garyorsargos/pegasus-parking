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
import { useNavigate, useParams } from "react-router-dom";
import { useMessage } from "../context/messageContext";
import { MessageTypes } from "../utils/messageTypes";

const EditPermit = () => {
  const [vehicleName, setVehicleName] = useState<string>("");
  const [permitType, setPermitType] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { permitId } = useParams<{ permitId: string }>();
  const navigate = useNavigate();
  const { setMessage, showMessage, hideMessage } = useMessage();

  useEffect(() => {
    hideMessage("editPermitMessage");
    return () => hideMessage("editPermitMessage");
  }, []);

  useEffect(() => {
    const fetchPermitDetails = async () => {
      try {
        const response = await axios.get("/api/getPermits", {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.success) {
          const permits = response.data.data;
          const selectedPermit = permits.find((permit: any) => permit._id === permitId);

          if (selectedPermit) {
            setVehicleName(selectedPermit.licence);
            setPermitType(selectedPermit.permit);
            setExpirationDate(selectedPermit.expiration);
          } else {
            alert("Permit not found.");
            navigate("/user/permits");
          }
        } else {
          alert(response.data.message?.message || "Failed to load permits.");
          navigate("/user/permits");
        }
      } catch (error) {
        console.error("Error fetching permits:", error);
        alert("Failed to load permits.");
        navigate("/user/permits");
      } finally {
        setLoading(false);
      }
    };

    fetchPermitDetails();
  }, [permitId, navigate]);

  const handleSubmit = async () => {
    if (!vehicleName || !permitType || !expirationDate) {
      alert("Please fill all fields before submission!");
      return;
    }

    try {
      const response = await axios.put(
        "/api/editPermit",
        {
          permitId,
          permit: permitType,
          licence: vehicleName,
          expiration: expirationDate,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        if (response.data.message) {
          setMessage("editPermitMessage", response.data.message.type, response.data.message.message);
          showMessage("editPermitMessage");
        }
        navigate("/user/permits");
      } else {
        if (response.data.message) {
          setMessage("editPermitMessage", response.data.message.type, response.data.message.message);
          showMessage("editPermitMessage");
        }
      }
    } catch (error) {
      setMessage("editPermitMessage", MessageTypes.ERROR, "Failed to update permit.");
      showMessage("editPermitMessage");
    }
  };

  if (loading) {
    return <Text>Loading permit details...</Text>;
  }

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
        Edit Permit
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
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};

export default EditPermit;