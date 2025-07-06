import React from 'react';
import '../styles/App.css';

const TaskFilter = ({ filter, setFilter, counts }) => {
  const filters = [
    { key: 'all', label: '📋 All', count: counts.all },
    { key: 'pending', label: '⏳ Pending', count: counts.pending },
    { key: 'completed', label: '✅ Completed', count: counts.completed }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      gap: '1rem', 
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    }}>
      {filters.map(filterObj => (
        <button
          key={filterObj.key}
          onClick={() => setFilter(filterObj.key)}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s',
            background: filter === filterObj.key 
              ? '#3b82f6' 
              : '#f3f4f6',
            color: filter === filterObj.key 
              ? 'white' 
              : '#374151',
            boxShadow: filter === filterObj.key 
              ? '0 2px 8px rgba(59, 130, 246, 0.3)' 
              : '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          {filterObj.label} ({filterObj.count})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;