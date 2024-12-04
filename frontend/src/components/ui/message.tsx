import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useMessage } from '../context/messageContext';
import { MessageTypes } from '../utils/messageTypes';

interface MessageProps 
{
    id: string;
}

const Message: React.FC<MessageProps> = ({ id }) => 
{

    const { messages } = useMessage();
    const message = messages.find((msg) => msg.id === id);

    if (!message || !message.visible) return null;

    const getColor = (type: MessageTypes) => 
    {
        switch (type) 
        {
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

    return (
        <Box bg={getColor(message.type)} p={4} borderRadius="md" color="white">
            <Text>{message.text}</Text>
        </Box>
    );

};

export default Message;