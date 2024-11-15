import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function PaginationRound({ page, totalPages, onPageChange }) {
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  return (
    <Stack spacing={2} className=' pb-2'>
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