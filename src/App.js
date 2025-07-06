import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from './utils/localStorage';
import './styles/App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedUser = loadFromLocalStorage('taskTracker_user');
    const savedTasks = loadFromLocalStorage(`taskTracker_tasks_${savedUser}`, []);
    if (savedUser) {
      setUser(savedUser);
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (user) {
      saveToLocalStorage(`taskTracker_tasks_${user}`, tasks);
    }
  }, [tasks, user]);

  const handleLogin = (username) => {
    setUser(username);
    saveToLocalStorage('taskTracker_user', username);
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    removeFromLocalStorage('taskTracker_user');
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    setShowTaskForm(false);
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId, updatedData) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      pending: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length
    };
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const filteredTasks = getFilteredTasks().filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const taskCounts = getTaskCounts();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ 
        background: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '1rem 20px'
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.8rem',
              color: '#1f2937'
            }}>
              📋 Task Tracker
            </h1>
            <p style={{ margin: 0, color: '#555' }}>
              Welcome back, {user}!
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              border: 'none',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: '2rem 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>My Tasks</h2>
          <button
            onClick={() => setShowTaskForm(prev => !prev)}
            style={{
              background: '#2563eb',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + Add Task
          </button>
        </div>

        {showTaskForm && (
          <div style={{ marginTop: '20px' }}>
            <TaskForm
              onAddTask={addTask}
              onCancel={() => setShowTaskForm(false)}
            />
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              margin: '1rem 0',
              border: '1px solid #ccc',
              borderRadius: '6px'
            }}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <TaskFilter
            filter={filter}
            setFilter={setFilter}
            counts={taskCounts}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTaskComplete}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
