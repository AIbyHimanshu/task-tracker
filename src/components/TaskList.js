import React from 'react';
import TaskItem from './TaskItem';
import '../styles/App.css';

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem 1rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem',
          opacity: 0.3
        }}>
          📋
        </div>
        <h3 style={{ 
          marginBottom: '0.5rem',
          color: '#6b7280',
          fontSize: '1.2rem'
        }}>
          No tasks found
        </h3>
        <p style={{ 
          color: '#9ca3af',
          fontSize: '0.9rem'
        }}>
          You don't have any tasks yet. Add your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
