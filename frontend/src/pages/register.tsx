import { useState } from "react";
import { Box, Heading, Input, Button, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMessage } from "../context/messageContext";
import { MessageTypes } from "../utils/messageTypes";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setMessage, showMessage } = useMessage();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "/api/register",
        { firstName, lastName, userName: username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessage("registerMessage", response.data.message?.type || MessageTypes.SUCCESS, response.data.message?.message || "Registration successful.");
        showMessage("registerMessage");
        navigate("/");
      } else {
        setMessage("registerMessage", response.data.message?.type || MessageTypes.ERROR, response.data.message?.message || "Registration failed.");
        showMessage("registerMessage");
      }
    } catch (error) {
      setMessage("registerMessage", MessageTypes.ERROR, "An error occurred during registration. Please try again.");
      showMessage("registerMessage");
      console.error("Error registering:", error);
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
      height="65vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="5px"
      p="6"
    >
      <Heading as="h1" size="5xl" mb="2" color="black">
        Pegasus Parking
      </Heading>
      <Text fontSize="lg" color="gray.500" mb="6">
        Register
      </Text>
      <Stack width="100%" maxWidth="sm">
        <Input
          placeholder="First Name"
          size="lg"
          borderColor="gray.300"
          color="black"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          size="lg"
          borderColor="gray.300"
          color="black"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          placeholder="Username"
          size="lg"
          borderColor="gray.300"
          color="black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          size="lg"
          borderColor="gray.300"
          color="black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          bg="#3067bf"
          color="white"
          size="lg"
          width="100%"
          onClick={handleRegister}
        >
          Register
        </Button>
      </Stack>
      <Text mt={4}>
        <Link
          to="/login"
          style={{ color: "#3067bf", textDecoration: "underline" }}
        >
          Back to login page
        </Link>
      </Text>
    </Box>
  );
};

export default Register;