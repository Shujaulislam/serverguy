// src/components/Content.js
import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid2, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent, setCurrentPage } from '../redux/contentSlice';
import { PaginationRounded } from './Footer';

function Content() {
  const dispatch = useDispatch();
  const { items, status, query, currentPage, totalPages } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent({ query, page: currentPage }));
  }, [dispatch, query, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage - 1)); // Algolia uses 0-based indexing
  };

  return (
    <Box my={4}>
      <Grid2 container spacing={2}>
        {status === 'loading' && <CircularProgress color="inherit" />}
        {status === 'succeeded' && items.map((item) => (
          <Grid2 item xs={12} key={item.objectID}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{item.title || 'No Title'}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.url || 'No URL'}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
        {status === 'failed' && <Typography>Error fetching data.</Typography>}
      </Grid2>
      {status === 'succeeded' && (
        <Box mt={2} display="flex" justifyContent="center">
          <PaginationRounded 
            page={currentPage + 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
}

export default Content;
