import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent, setCurrentPage } from '../redux/contentSlice';
import PaginationRound from './Pagination';


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
    <Box className='w-full bg-[#F6F6EF]'>
      {status === 'succeeded' && (
        <div style={{ paddingLeft: '1em' }}>
          {items.map((item) => (
            <div key={item.objectID} style={{ marginBottom: '8px' }}>
              <div className=" flex flex-col mb-2 " >
                <div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#000000', 
                      textDecoration: 'none',
                      fontSize: '16px',
                      fontWeight: '400',
                    }}
                  >
                    {item.title || 'No Title'}
                  </a>
                  {item.url && (
                    <span style={{ color: '#666', fontSize: '14px', marginLeft: '5px' }}>
                      ({new URL(item.url).hostname})
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '3px' }}>
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
          <PaginationRound 
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
