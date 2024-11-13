import React, { useState } from 'react';

function Filters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    storyType: 'story',
    date: 'popularity',
    timeRange: 'all'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="filters-container"
    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', backgroundColor: '#F6F6F6' }}>
      <span
      style={{ fontWeight: 'bold', color: '#000', fontSize: '14px' }}
      >Search</span>

      <select
        value={filters.storyType}
        onChange={(e) => handleFilterChange('storyType', e.target.value)}
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
        value={filters.date}
        onChange={(e) => handleFilterChange('date', e.target.value)}
      >
        <option value="popularity">Popularity</option>
        <option value="date">Date</option>
      </select>

      <span>for</span>

      <select
        value={filters.timeRange}
        onChange={(e) => handleFilterChange('timeRange', e.target.value)}
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
