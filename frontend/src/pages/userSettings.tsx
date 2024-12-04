import { useState, useEffect } from 'react';
import { Box, Image, Heading, Text, Button, Flex, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useMessage } from '../context/messageContext';
import { MessageTypes } from '../utils/messageTypes';
import '../components/ui/styles/userSettings.css';

const UserSettings = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { setMessage, showMessage, hideMessage } = useMessage();

  useEffect(() => {
    hideMessage("userSettingsMessage");

    axios.get('/api/getUserInfo')
      .then((response) => {
        const { username, firstName, lastName } = response.data.data;
        setUsername(username);
        setFirstName(firstName);
        setLastName(lastName);
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });

    return () => hideMessage("userSettingsMessage");
  }, []); // Empty dependency array to run only once on mount and unmount

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout');
      if (response.data.success) {
        window.location.href = '/';
      } else {
        alert(response.data.message?.message || 'Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This is PERMANENT!');
    if (confirmed) {
      try {
        const response = await axios.delete('/api/deleteAccount');
        if (response.data.success) {
          window.location.href = '/';
        } else {
          alert(response.data.message?.message || 'Failed to delete account. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
      }
    }
  };

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
          <Button className="logout-button" size="lg" onClick={handleLogout}>
            Logout
          </Button>
          <Button
            className="delete-account-button"
            size="lg"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserSettings;