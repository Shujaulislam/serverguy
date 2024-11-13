import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContent } from '../redux/contentSlice';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

function Filters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    tags: 'story',
    sortBy: 'points',
    numericFilters: null
  });

  const debouncedFetchContent = useCallback(
    debounce((newFilters) => {
      dispatch(fetchContent({
        page: 0,
        filters: newFilters
      }));
    }, 300),
    [dispatch]
  );

  const handleFilterChange = (key, value) => {
    let newValue = value;
    
    if (key === 'numericFilters') {
      if (value === 'all') {
        newValue = null;
      } else {
        const now = Math.floor(Date.now() / 1000);
        switch (value) {
          case 'last24h':
            newValue = `created_at_i>${now - 86400}`;
            break;
          case 'pastWeek':
            newValue = `created_at_i>${now - 604800}`;
            break;
          case 'pastMonth':
            newValue = `created_at_i>${now - 2592000}`;
            break;
          case 'pastYear':
            newValue = `created_at_i>${now - 31536000}`;
            break;
          default:
            newValue = null;
        }
      }
    }
  
    if (key === 'sortBy') {
      newValue = value === 'date' ? 'created_at_i' : 'points';
    }

    const newFilters = { ...filters, [key]: newValue };
    setFilters(newFilters);
    
    const searchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) searchParams.append(key, value);
    });
    
    navigate(`?${searchParams.toString()}`);
    
    debouncedFetchContent(newFilters);
  };

  useEffect(() => {
    dispatch(fetchContent({ filters }));
  }, [dispatch]);

  return (
    <div className="filters-container"
    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', backgroundColor: '#F6F6F6' }}>
      <span
      style={{ color: '#000', fontSize: '14px' }}
      >Search</span>

      <select
        value={filters.tags}
        onChange={(e) => handleFilterChange('tags', e.target.value)}
        style={{ 
          padding: '4px 8px', 
          borderRadius: '3px', 
          border: '1px solid #D8D8D8', 
          fontSize: '14px', 
          cursor: 'pointer', 
          backgroundColor: 'white', 
          color: '#000',
          '&:hover': {
            borderColor: '#FF742B'
          },
          '&:focus': {
            borderColor: '#999',
            outline: 'none'
          }
        }}
        
      >
        <option value="story">Stories</option>
        <option value="comment">Comments</option>
        <option value="poll">Polls</option>
        <option value="pollopt">Poll Options</option>
        <option value="show_hn">Show HN</option>
        <option value="ask_hn">Ask HN</option>
        <option value="front_page">Front Page</option>
      </select>

      <span>by</span>

      <select
        value={filters.sortBy === 'points' ? 'popularity' : 'date'}
        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        style={{ 
          padding: '4px 8px', 
          borderRadius: '3px', 
          border: '1px solid #D8D8D8', 
          fontSize: '14px', 
          cursor: 'pointer', 
          backgroundColor: 'white', 
          color: '#000',
          '&:hover': {
            borderColor: '#FF742B'
          },
          '&:focus': {
            borderColor: '#999',
            outline: 'none'
          }
        }}
      >
        <option value="popularity">Popularity</option>
        <option value="date">Date</option>
      </select>

      <span>for</span>

      <select
        value={filters.numericFilters === null ? 'all' : filters.numericFilters}
        onChange={(e) => handleFilterChange('numericFilters', e.target.value)}
        style={{ 
          padding: '4px 8px', 
          borderRadius: '3px', 
          border: '1px solid #D8D8D8', 
          fontSize: '14px', 
          cursor: 'pointer', 
          backgroundColor: 'white', 
          color: '#000',
          '&:hover': {
            borderColor: '#FF742B'
          },
          '&:focus': {
            borderColor: '#999',
            outline: 'none'
          }
        }}
      >
        <option value="all">All time</option>
        <option value="last24h">Last 24h</option>
        <option value="pastWeek">Past Week</option>
        <option value="pastMonth">Past Month</option>
        <option value="pastYear">Past Year</option>
      </select>
    </div>
  );
}

export default Filters;
