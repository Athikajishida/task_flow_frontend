import React, { useState } from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl border border-orange-200 max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-3" size={24} />
            <h2 className="text-lg font-semibold text-orange-800">Confirm Delete</h2>
            <button 
              onClick={onClose} 
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="text-orange-700 mb-6">
            Are you sure you want to delete the task:
            <span className="font-medium ml-1 text-orange-900">"{taskTitle}"</span>?
          </p>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition-colors"
            >
              <Trash2 size={16} className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;