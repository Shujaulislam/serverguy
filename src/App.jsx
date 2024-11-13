// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import { Container, CssBaseline } from '@mui/material';
import Filters from './components/Filters';

function App() {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Navbar />
      <Filters />
      <Content />
      <Footer />
    </Container>
  );
}

export default App;
