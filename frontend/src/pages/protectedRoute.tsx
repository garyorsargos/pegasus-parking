import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMessage } from '../context/MessageContext';
import { MessageTypes } from '../utils/messageTypes';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setMessage, showMessage } = useMessage();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/getUserInfo', { withCredentials: true });
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setMessage("authMessage", response.data.message?.type || MessageTypes.ERROR, response.data.message?.message || "Authentication failed.");
          showMessage("authMessage");
        }
      } catch (error) {
        setIsAuthenticated(false);
        setMessage("authMessage", MessageTypes.ERROR, "Failed to authenticate. Please try again.");
        showMessage("authMessage");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setMessage, showMessage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;