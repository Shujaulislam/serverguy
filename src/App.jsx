// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import AuthRoutes from './routes/AuthRoutes';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import { Container, CssBaseline } from '@mui/material';
import Filters from './components/Filters';

function App() {
  const { items, status } = useSelector((state) => state.content);

  return (
    <AuthProvider>
      <Container maxWidth="xl">
        {/* <CssBaseline /> */}
        <AuthRoutes />
        <Navbar />
        <Filters />
        <Content />
        <Footer />
      </Container>
    </AuthProvider>
  );
}

export default App;
