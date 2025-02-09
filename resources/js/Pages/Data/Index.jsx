import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContainerAuth from "@/Components/MyComponents/ContainerAuth";
import ExportButton from "@/Components/MyComponents/ExportButton";
import { NoContent } from "@/Components/MyComponents/NoContent";
import Pagination from "@/Components/Pagination";
import SuccessMessage from "@/Components/project/SuccessMessage";
import FilterForm from "@/Components/project/FilterForm";
import DeleteModal from "@/Components/project/DeleteModal";
import { setAllFieldsToNull } from "@/utils/functions";
import DataTable from "@/Components/data/DataTable";

const ROWS = 10;

export default function Index({ auth, data, queryParams = null, plants }) {
  queryParams = queryParams || {};
  const { flash } = usePage().props;
  const [showSuccess, setShowSuccess] = useState(false);
  const [filters, setFilters] = useState({
    area: queryParams.area || "",
    project_id: queryParams.project_id || "",
    rows: queryParams.rows || ROWS,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setDataToDelete] = useState(null);

  useEffect(() => {
    if (flash.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAllFieldsToNull(flash);
      }, 3000);
    }
  }, [flash]);

  const deleteProject = (project) => {
    router.delete(route("data.destroy", project.id), {
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
      route("data.index"),
      { ...filters, [name]: value },
      { preserveState: true, replace: true }
    );
  };

  const clearFilter = () => {
    setFilters({ area: "", project_id: "", rows: ROWS });
    router.get(route("data.index"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Data
          </h2>
          {(auth.user.roles.includes("Project") ||
            auth.user.permissions.includes("Create Project")) && (
            <Link
              href={route("data.create")}
              className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
            >
              New Project
            </Link>
          )}
        </div>
      }
    >
      <Head title="Data" />
      <ContainerAuth>
        {showSuccess && (
          <SuccessMessage
            message={flash.success}
            onClose={() => setShowSuccess(false)}
          />
        )}

        {data.data.length > 0 ? (
          <>
            <FilterForm
              filters={filters}
              plants={plants}
              handleFilterChange={handleFilterChange}
              clearFilter={clearFilter}
            />

            <DataTable
              data={data.data}
              auth={auth}
              setDataToDelete={setDataToDelete}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={() => deleteProject(projectToDelete)}
            />
            <Pagination links={data.meta.links} filters={filters} />
          </>
        ) : (
          <NoContent text="No Content" icon="🛢" />
        )}
      </ContainerAuth>

      {/* <pre>{JSON.stringify(data.data, undefined, 2)}</pre> */}
    </AuthenticatedLayout>
  );
}
