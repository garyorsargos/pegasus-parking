import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    
  useEffect(() => {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/getUserInfo', false); // false makes the request synchronous
    xhr.withCredentials = true;
    xhr.send(null);

    if (xhr.status === 200) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

};

export default ProtectedRoute;