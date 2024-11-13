// src/components/Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Box, Button } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch } from 'react-redux';
import { setQuery, fetchContent, setCurrentPage } from '../redux/contentSlice';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

function Navbar() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    dispatch(setCurrentPage(0));
    dispatch(setQuery(searchText));
    dispatch(fetchContent({ query: searchText, page: 0 }));
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ backgroundColor: '#FF742B' }}>
        <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
          HN Algolia Clone
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            style={{ backgroundColor: 'white' }}
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()} 
          >
            <SearchOutlined color="#FF742B" />
          </TextField>
          <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: 8 }}>
            Search
          </Button>
          <Button>
            <SettingsOutlinedIcon style={{ color: 'black' }} />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
