import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { updateTask, deleteTask } from '../store/tasksSlice';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const handleUpdateTask = (task) => {
    dispatch(updateTask({ 
      id: task.id, 
      updateData: { 
        status: task.status === 'completed' ? 'pending' : 'completed' 
      } 
    }));
  };

  // const handleDeleteTask = (taskId) => {
  //   if (window.confirm('Are you sure you want to delete this task?')) {
  //     dispatch(deleteTask(taskId));
  //   }
  // };

  const handleDeleteTask = (taskId) => {
    setTaskToDelete(tasks.find(task => task.id === taskId));
    setDeleteModalOpen(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.id));
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      alert('Task title cannot be empty');
      return;
    }

    dispatch(updateTask({
      id: editingTask.id,
      updateData: {
        title: editTitle,
        description: editDescription
      }
    }));

    setEditingTask(null);
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-orange-700">Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className="bg-orange-50 shadow rounded-lg p-4 hover:bg-orange-100 border border-orange-200"
            >
              {editingTask && editingTask.id === task.id ? (
                // Edit Mode
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-2 px-2 py-1 border rounded-md border-orange-300 focus:ring focus:ring-orange-200"
                    placeholder="Task Title"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-2 px-2 py-1 border rounded-md border-orange-300 focus:ring focus:ring-orange-200"
                    placeholder="Task Description"
                    rows="3"
                  />
                  <div className="flex space-x-2">
                    <button 
                      className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center"
                      onClick={saveEdit}
                    >
                      <Check size={16} className="mr-1" /> Save
                    </button>
                    <button 
                      className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center"
                      onClick={cancelEdit}
                    >
                      <X size={16} className="mr-1" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => handleUpdateTask(task)}
                      className="mr-2 text-orange-600 focus:ring-orange-500 rounded"
                    />
                    <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-orange-800'}`}>
                      {task.title}
                    </h3>
                  </div>
                  <p className={`mt-1 ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-orange-600'}`}>
                    {task.description}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-sm mt-2 ${
                    task.status === 'completed' 
                      ? 'bg-green-200 text-green-800' 
                      : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                  <div className="mt-2 flex space-x-2">
                    <button 
                      className="bg-orange-500 text-white px-2 py-1 rounded-md"
                      onClick={() => startEditing(task)}
                    >
                      <Pencil size={16} />
                    </button>
                    <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteTask}
        taskTitle={taskToDelete?.title || ''}
      />
                    <button 
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;