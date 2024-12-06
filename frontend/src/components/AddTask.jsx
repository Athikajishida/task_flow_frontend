import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../store/tasksSlice';

const AddTask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    dispatch(createTask({
      title,
      description,
      status: 'pending'
    }));

    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-amber-800">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-amber-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-amber-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            rows="3"
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;