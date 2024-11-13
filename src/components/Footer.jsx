// src/components/Footer.js
import React from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export function PaginationRounded({ page, totalPages, onPageChange }) {
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  return (
    <Stack spacing={2}>
      <Pagination 
        count={totalPages} 
        page={page}
        shape="rounded" 
        variant="outlined"
        onChange={handlePageChange}
      />
    </Stack>
  );
}

function Footer() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
      <ul style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <li><a href="/about">About</a></li>
        <li><a href="/settings">Setting</a></li>
        <li><a href="/help">Help</a></li>
        <li><a href="/api">API Documentation</a></li>
        <li><a href="/news">Hacker News</a></li>
        <li><a href="/fork">Fork/Contribute</a></li>
        <li><a href="/apps">Cool Apps</a></li>
      </ul>
    </div>
  );
}

export default Footer;
