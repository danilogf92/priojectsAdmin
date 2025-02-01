// pages/Projects/Index.jsx
import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContainerAuth from "@/Components/MyComponents/ContainerAuth";
import ExportButton from "@/Components/MyComponents/ExportButton";
import { NoContent } from "@/Components/MyComponents/NoContent";
import Pagination from "@/Components/Pagination";
import SuccessMessage from "@/Components/project/SuccessMessage";
import FilterForm from "@/Components/project/FilterForm";
import ProjectsTable from "@/Components/project/ProjectsTable";
import DeleteModal from "@/Components/project/DeleteModal";

const ROWS = 10;

export default function Index({ auth, projects, queryParams = null, plants }) {
  queryParams = queryParams || {};
  const { flash } = usePage().props;
  const [showSuccess, setShowSuccess] = useState(false);
  const [filters, setFilters] = useState({
    date: queryParams.date || "",
    plant_id: queryParams.plant_id || "",
    rows: queryParams.rows || ROWS,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    if (flash.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        flash.success = null;
        flash.error = null;
      }, 3000);
    }
  }, [flash]);

  const deleteProject = (project) => {
    router.delete(route("projects.destroy", project.id), {
      onSuccess: () => {
        setShowSuccess(true);

        setIsDeleteModalOpen(false);
      },
      onError: (errors) => console.log(errors),
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    router.get(
      route("projects.index"),
      { ...filters, [name]: value },
      { preserveState: true, replace: true }
    );
  };

  const clearFilter = () => {
    setFilters({ date: "", plant_id: "", rows: ROWS });
    router.get(route("projects.index"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
          </h2>
          {(auth.user.roles.includes("Project") ||
            auth.user.permissions.includes("Create Project")) && (
            <Link
              href={route("projects.create")}
              className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
            >
              New Project
            </Link>
          )}
        </div>
      }
    >
      <Head title="Projects" />
      <ContainerAuth>
        {showSuccess && (
          <SuccessMessage
            message={flash.success}
            onClose={() => setShowSuccess(false)}
          />
        )}

        {projects.data.length > 0 ? (
          <>
            <FilterForm
              filters={filters}
              plants={plants}
              handleFilterChange={handleFilterChange}
              clearFilter={clearFilter}
            />

            <ProjectsTable
              projects={projects}
              auth={auth}
              setProjectToDelete={setProjectToDelete}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={() => deleteProject(projectToDelete)}
            />
            <Pagination links={projects.meta.links} filters={filters} />
          </>
        ) : (
          <NoContent text="No Content" icon="🛢" />
        )}
      </ContainerAuth>

      <pre>{JSON.stringify(flash, undefined, 2)}</pre>
    </AuthenticatedLayout>
  );
}
