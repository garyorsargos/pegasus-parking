import { useState } from "react";
import { Box, Heading, Input, Button, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogin = async () => {
  try {
    const response = await axios.post(
      "https://parking.garyorsargos.xyz/api/login",
      { username, password }, // Use POST body for credentials
      { withCredentials: true } // Include cookies
    );

    if (response.status === 200) {
      navigate("/user/parking");
    }
    console.log("Login successful:", response.data);
  } catch (error) {
    console.error("Error logging in:", error);
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
