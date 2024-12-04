import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useMessage } from '../../context/messageContext';
import { MessageTypes } from '../../utils/messageTypes';

interface MessageProps {
  id: string;
}

const Message: React.FC<MessageProps> = ({ id }) => {
  const { messages } = useMessage();
  const message = messages.find((msg) => msg.id === id);

  if (!message || !message.visible) return null;

  const getColor = (type: MessageTypes) => {
    switch (type) {
      case MessageTypes.SUCCESS:
        return 'green.500';
      case MessageTypes.ERROR:
        return 'red.500';
      case MessageTypes.WARNING:
        return 'yellow.500';
      case MessageTypes.INFO:
        return 'gray.500';
      default:
        return 'blue.500';
    }
  };

  const getBackgroundColor = (type: MessageTypes) => {
    switch (type) {
      case MessageTypes.SUCCESS:
        return 'green.100';
      case MessageTypes.ERROR:
        return 'red.100';
      case MessageTypes.WARNING:
        return 'yellow.100';
      case MessageTypes.INFO:
        return 'gray.100';
      default:
        return 'blue.100';
    }
  };

  return (
    <Box
      borderWidth="2px"
      borderStyle="solid"
      borderColor={getColor(message.type)}
      backgroundColor={getBackgroundColor(message.type)}
      p={2}
      borderRadius="md"
      color={getColor(message.type)}
      maxWidth="300px"
      width="fit-content"
      margin="5px auto"
    >
      <Text>{message.text}</Text>
    </Box>
  );
};

export default Message;