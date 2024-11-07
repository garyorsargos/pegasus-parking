import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/index'
import Login from './pages/login'
import Register from './pages/register'
import UserSettings from './pages/userSettings'
import MyPermits from './pages/myPermits'
import ParkingFinder from './pages/parkingFinder'
import './App.css'
import { Box } from '@chakra-ui/react';

function App() {

  return (
    <>
    <BrowserRouter>
    <Box>Navbar</Box>
      <Routes>
        <Route path="/home" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/parking" element={<ParkingFinder />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/permits" element={<MyPermits />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
