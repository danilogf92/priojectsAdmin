import React, { createContext, useContext, useState, useEffect } from "react";
import { router } from "@inertiajs/react";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const ROWS = 10;

  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    plant_id: "",
    rows: ROWS,
  });
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para cargar proyectos desde el servidor
  const loadProjects = async (customFilters = {}) => {
    setLoading(true);

    // Actualizar filtros con los personalizados
    const updatedFilters = { ...filters, ...customFilters };
    setFilters(updatedFilters);

    // Hacer la solicitud para obtener proyectos
    router.get(route("projects.index"), updatedFilters, {
      preserveState: true,
      replace: true,
      onSuccess: (page) => {
        console.log(page);

        setProjects(page.props.projects.data);
        setPlants(page.props.plants);
        setLoading(false);
      },
      onError: () => setLoading(false),
    });
  };

  // Función para limpiar los filtros
  const clearFilters = () => {
    setFilters({ date: "", plant_id: "", rows: ROWS });
    loadProjects({ date: "", plant_id: "", rows: ROWS });
  };

  // Inicializar los proyectos al cargar el componente
  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        filters,
        setFilters,
        loadProjects,
        clearFilters,
        plants,
        loading,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
