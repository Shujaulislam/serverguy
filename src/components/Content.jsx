// src/components/Content.js
import React, { useEffect } from 'react';
import { Box, Typography, Grid2, CircularProgress } from '@mui/material';
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
    dispatch(setCurrentPage(newPage - 1));
  };

  return (
    <Box my={4} width="100%">
      {status === 'loading' && <CircularProgress color="inherit" />}
      {status === 'succeeded' && (
        <div style={{ paddingLeft: '1em' }}>
          {items.map((item) => (
            <div key={item.objectID} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#000000', 
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '400',
                    }}
                  >
                    {item.title || 'No Title'}
                  </a>
                  {item.url && (
                    <span style={{ color: '#666', fontSize: '12px', marginLeft: '5px' }}>
                      ({new URL(item.url).hostname})
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '3px' }}>
                  {item.points} points | {item.author} | {item.created_at} | {item.num_comments} comments
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {status === 'failed' && <Typography>Error fetching data.</Typography>}
      
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
