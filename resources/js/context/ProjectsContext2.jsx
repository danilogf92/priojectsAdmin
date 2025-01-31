import { createContext, useContext, useState, useEffect } from "react";
import { router } from "@inertiajs/react";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [filters, setFilters] = useState({
    date: "",
    plant_id: "",
    rows: 10,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);
  const [projects, setProjects] = useState([]); // Estado para almacenar los proyectos
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  // Efecto para obtener los datos iniciales
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await router.get(route("projects.index"), filters, {
          preserveState: true,
          only: ["projects"],
        });
        setProjects(response.props.projects.data); // Ajusta según la estructura de datos recibida
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filters]); // Vuelve a cargar los datos si cambian los filtros

  const value = {
    filters,
    setFilters,
    showSuccess,
    setShowSuccess,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    measurementToDelete,
    setMeasurementToDelete,
    projects,
    setProjects,
    loading,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}
