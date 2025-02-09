import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const ImportExcelData = ({ project }) => {
  const { data, setData, post, processing, errors } = useForm({
    id: project.id || null, // Value from `project`
    rate: project.rate || null, // Value from `project`
    file: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setData("file", e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.file) {
      // Validation to ensure a file is selected
      return;
    }

    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("id", data.id); // Add `id` to FormData
    formData.append("rate", data.rate); // Add `rate` to FormData

    post(route("import.import"), formData, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* File input field */}
        <label className="block mb-4">
          <span className="sr-only">Select file</span>
          <input
            type="file"
            accept=".xlsx, .csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>

        {/* Import button */}
        <button
          type="submit"
          disabled={processing || !data.file} // Disable if no file is selected or processing
          className={`px-4 py-2 rounded-md text-white font-semibold ${
            processing || !data.file
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition-colors duration-200`}
        >
          {processing ? "Importing..." : "Import"}
        </button>
      </form>

      {/* Error message if any */}
      {errors.file && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded-md">
          <p>{errors.file}</p>
        </div>
      )}

      {/* Success message after import */}
      {showSuccess && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded-md">
          <p>Data imported successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ImportExcelData;
