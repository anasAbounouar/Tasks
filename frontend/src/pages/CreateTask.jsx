import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from '../components/Tasks/TaskForm';

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', task);
      navigate('/tasks');  // Redirect to the tasks list page
    } catch (err) {
      setError('Error creating task');
      console.error('Error creating task:', err);
    }
  };

  return (
    <div >
      <h2 >Create New Task</h2>
      {error && <div>{error}</div>}

     <TaskForm/>
    </div>
  );
};




export default CreateTask;
