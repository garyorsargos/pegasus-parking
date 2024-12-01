import { Component } from 'react';
import { Box, Image, Heading, Text, Button, Flex, Stack } from '@chakra-ui/react';
import axios from 'axios';
import '../components/ui/styles/userSettings.css';

class UserSettings extends Component {
  state = {
    username: '',
    firstName: '',
    lastName: ''
  };

  componentDidMount() {
    axios.get('/api/getUserInfo')
      .then(response => {
        const { username, firstName, lastName } = response.data;
        this.setState({ username, firstName, lastName });
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }

  render() {
    const { username, firstName, lastName } = this.state;

    return (
      <Flex className="user-container">
        <Box className="user-box">
          <Box className="user-avatar">
            <Image
              src="https://cdl.ucf.edu/wp-content/uploads/2021/07/Blank-ID-avatar.png"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>

          <Heading as="h1" size="2xl" className="user-heading">
            {firstName} {lastName}
          </Heading>
          <Stack className="user-info">
            <Text fontSize="lg" color="gray.600">
              <strong>Username:</strong> {username}
            </Text>
          </Stack>

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

export default UserSettings;

