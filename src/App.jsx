import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AuthRoutes from './routes/AuthRoutes';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import { Container } from '@mui/material';
import Filters from './components/Filters';



function App() {
  

  return (
    <AuthProvider>
      <Container maxWidth="xl">
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
