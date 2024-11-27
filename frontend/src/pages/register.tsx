import { Component } from "react";
import { Box, Heading, Input, Button, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default class Register extends Component {
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
          />
          <Input
            placeholder="Last Name"
            size="lg"
            borderColor="gray.300"
            color="black"
          />
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
            Register
          </Button>
        </Stack>
        <Text mt={4}>
          <Link to="/login" style={{ color: "#3067bf", textDecoration: "underline" }}>
            Back to login page
          </Link>
        </Text>
      </Box>
    );
  }
}


