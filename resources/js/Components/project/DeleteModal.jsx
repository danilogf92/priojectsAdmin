// components/DeleteModal.jsx
import React from "react";
import Modal from "@/Components/Modal";

export default function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="sm">
      <div className="p-6 bg-slate-500 text-white">
        <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
        <p className="text-sm text-white mb-8">
          Are you sure you want to delete this project? This action cannot be
          undone.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
