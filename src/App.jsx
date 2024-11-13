// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import { Container, CssBaseline } from '@mui/material';
import Filters from './components/Filters';

function App() {
  const { items, status } = useSelector((state) => state.content);

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
