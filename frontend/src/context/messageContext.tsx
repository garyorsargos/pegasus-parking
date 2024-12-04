import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MessageTypes } from '../utils/messageTypes';

interface Message 
{
    id: string;
    type: MessageTypes;
    text: string;
    visible: boolean;
}

interface MessageContextProps 
{
    messages: Message[];
    setMessage: (id: string, type: MessageTypes, text: string) => void;
    showMessage: (id: string) => void;
    hideMessage: (id: string) => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => 
{

    const [messages, setMessages] = useState<Message[]>([]);

    const setMessage = (id: string, type: MessageTypes, text: string) => 
    {
        setMessages((prevMessages) => 
        {
            const existingMessage = prevMessages.find((msg) => msg.id === id);
            
            if (existingMessage) 
            {
                return prevMessages.map((msg) => (msg.id === id ? { ...msg, type, text } : msg));
            } else {
                return [...prevMessages, { id, type, text, visible: false }];
            }

        });

    };

    const showMessage = (id: string) => 
    {
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === id ? { ...msg, visible: true } : msg)));
    };

    const hideMessage = (id: string) => 
    {
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === id ? { ...msg, visible: false } : msg)));
    };

    return (
        <MessageContext.Provider value={{ messages, setMessage, showMessage, hideMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => 
{
    
    const context = useContext(MessageContext);

    if (!context) 
    {
        throw new Error('useMessage must be used within a MessageProvider');
    }

    return context;
    
};