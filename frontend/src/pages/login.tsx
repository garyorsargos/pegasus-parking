import { Component } from "react";
import { Box, Heading, Input, Button, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
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
            placeholder="Username"
            size="lg"
            borderColor="gray.300"
            color="black"
          />
          <Input
            placeholder="Password"
            type="password"
            size="lg"
            borderColor="gray.300"
            color="black"
          />
          <Button bg="#3067bf" color="white" size="lg" width="100%">
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
  }
}
