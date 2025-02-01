// components/FilterForm.jsx
import React from "react";

export default function FilterForm({
  filters,
  plants,
  handleFilterChange,
  clearFilter,
}) {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2">
        <div className="col-span-1">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="plant_id"
            className="block text-sm font-medium text-gray-700"
          >
            Plant
          </label>
          <select
            name="plant_id"
            id="plant_id"
            value={filters.plant_id}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Plant</option>
            {plants.map((plant) => (
              <option key={plant.id} value={plant.id}>
                {plant.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <label
            htmlFor="rows"
            className="block text-sm font-medium text-gray-700"
          >
            Rows
          </label>
          <select
            name="rows"
            id="rows"
            value={filters.rows}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="col-span-1 flex items-end space-x-2">
          <button
            onClick={clearFilter}
            className="w-full bg-red-500 text-white py-2 px-4 rounded shadow"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
