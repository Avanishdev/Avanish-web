import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext.js';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PropertyList from './pages/PropertyList.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property" element={<PropertyList />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
