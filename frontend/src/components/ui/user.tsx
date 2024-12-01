import React, { Component } from 'react';
import { Box, Image, Heading, Text, Button, Flex, Stack } from '@chakra-ui/react';
import './styles/userSettings.css';

class User extends Component {
  render() {
    return (
      <Flex className="user-container">
        <Box className="user-box">
          {/* Profile Avatar */}
          <Box className="user-avatar">
            <Image
              src="https://cdl.ucf.edu/wp-content/uploads/2021/07/Blank-ID-avatar.png"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>

          {/* User Info */}
          <Heading as="h1" size="2xl" className="user-heading">
            JOHN SMITH
          </Heading>
          <Stack className="user-info">
            <Text fontSize="lg" color="gray.600">
              <strong>Account Created:</strong> January 12th, 2024
            </Text>
            <Text fontSize="lg" color="gray.600">
              <strong>Username:</strong> johnsmith1234
            </Text>
          </Stack>

          {/* Action Buttons */}
          <Flex className="user-buttons">
            <Button className="logout-button" size="lg">
              Logout
            </Button>
            <Button className="delete-account-button" size="lg">
              Delete Account
            </Button>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default User;