import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/add`, {
        title: taskInput,
      });
      // Add new task directly to state for instant update
      setTasks([response.data, ...tasks]);
      setTaskInput('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>MERN To-Do List</h2>

      {/* Task Input Form */}
      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Task
        </button>
      </form>

      {/* Task List Display */}
      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task._id} style={styles.listItem}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Simple inline styling
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    textAlign: 'left',
  },
};

export default App;