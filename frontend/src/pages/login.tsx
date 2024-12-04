import { useState } from "react";
import { Box, Heading, Input, Button, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMessage } from "../context/messageContext";
import { MessageTypes } from "../utils/messageTypes";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { setMessage, showMessage } = useMessage();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/api/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        if (response.data.message) {
          setMessage("loginMessage", response.data.message.type, response.data.message.message);
          showMessage("loginMessage");
        }
        navigate("/user/parking");
      } else {
        if (response.data.message) {
          setMessage("loginMessage", response.data.message.type, response.data.message.message);
          showMessage("loginMessage");
        }
      }
    } catch (error) {
      setMessage("loginMessage", MessageTypes.ERROR, "An unexpected error occurred.");
      showMessage("loginMessage");
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
      height="50vh"
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
        Login
      </Text>
      <Stack width="100%" maxWidth="sm">
        <Message id="loginMessage" />
        <Input
          name="username"
          placeholder="Username"
          size="lg"
          borderColor="gray.300"
          color="black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          name="password"
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
          onClick={handleLogin}
        >
          Login
        </Button>
      </Stack>
      <Text mt={4}>
        <Link
          to="/register"
          style={{ color: "#3067bf", textDecoration: "underline" }}
        >
          Register New Account
        </Link>
      </Text>
    </Box>
  );
};

export default Login;