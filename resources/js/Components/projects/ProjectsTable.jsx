// components/Projects/ProjectsTable.js
import { useProjects } from "@/context/ProjectsContext2";
import Modal from "@/Components/Modal";

export default function ProjectsTable({ projects }) {
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    setMeasurementToDelete,
    showSuccess,
  } = useProjects();

  const openDeleteModal = (project) => {
    setMeasurementToDelete(project);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2 my-2">
      {showSuccess && <div className="alert-success">Project Deleted!</div>}
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Plant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.plant}</td>
              <td>
                <button
                  onClick={() => openDeleteModal(project)}
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          // Aquí puedes llamar al método de eliminación
        }}
      />
    </div>
  );
}
