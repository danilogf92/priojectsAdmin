// components/Projects/Filters.js
import { useProjects } from "@/context/ProjectsContext2";
import { router } from "@inertiajs/react";

export default function ProjectFilter({ plants }) {
  const { filters, setFilters } = useProjects();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    router.get(
      route("projects.index"),
      {
        ...filters,
        [name]: value,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const clearFilter = () => {
    setFilters({ date: "", plant_id: "", rows: 10 });
    router.get(route("projects.index"));
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleFilterChange}
        className="border rounded p-2"
      />
      <select
        name="plant_id"
        value={filters.plant_id}
        onChange={handleFilterChange}
        className="border rounded p-2"
      >
        <option value="">All Plants</option>
        {plants.map((plant) => (
          <option key={plant.id} value={plant.id}>
            {plant.name}
          </option>
        ))}
      </select>
      <button
        onClick={clearFilter}
        className="bg-red-500 text-white px-3 py-2 rounded"
      >
        Clear
      </button>
    </div>
  );
}
