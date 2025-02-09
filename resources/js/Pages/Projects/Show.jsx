import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ShowInfoProject } from "@/Components/project/ShowInfoProject";
import DataTable from "@/Components/data/DataTable";
import Pagination from "@/Components/Pagination";
import TabButton from "@/Components/MyComponents/TabButton";
import ProjectDashboard from "@/Components/project/ProjectDashboard";

const ROWS = 10;

export default function Show({
  auth,
  project,
  data,
  queryParams = null,
  dashboard,
}) {
  queryParams = queryParams || {};
  const { flash } = usePage().props;
  const [filters, setFilters] = useState({
    area: queryParams.area || "",
    project_id: queryParams.project_id || "",
    rows: queryParams.rows || ROWS,
  });

  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState("data");

  const dataLen = data.data.length > 0;

  useEffect(() => {
    if (dataLen) {
      setActiveTab("data");
    } else {
      setActiveTab("info");
    }
  }, [dataLen]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Project ${project.data.name}`}
          </h2>
          <Link
            href={route("projects.index")}
            className="bg-gray-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-gray-600"
          >
            Back to Projects
          </Link>
        </div>
      }
    >
      <Head title={`Project ${project.data.name}`} />
      <div className="m-2 p-2 bg-white shadow-md rounded-lg">
        {/* Botones para las pestañas */}
        <div className="flex justify-center space-x-4 border-b border-gray-200">
          {dataLen && (
            <TabButton
              label="Data"
              activeTab={activeTab}
              tabName="data"
              onClick={setActiveTab}
            />
          )}

          {dataLen && (
            <TabButton
              label="Dashboard"
              activeTab={activeTab}
              tabName="dashboard"
              onClick={setActiveTab}
            />
          )}

          <TabButton
            label="Information"
            activeTab={activeTab}
            tabName="info"
            onClick={setActiveTab}
          />
        </div>

        {/* Contenido de las pestañas */}
        <div className="mt-4">
          {activeTab === "info" && (
            <div>
              <ShowInfoProject project={project.data} />
            </div>
          )}
          {activeTab === "data" && (
            <div>
              <DataTable
                data={data.data}
                auth={auth}
                setDataToDelete={() => console.log("test")}
                setIsDeleteModalOpen={() => console.log("test 2")}
              />
              <Pagination links={data.meta.links} filters={filters} />
            </div>
          )}
          {activeTab === "dashboard" && <div></div>}
        </div>
        <ProjectDashboard dashboardItems={dashboard} />
        <pre>{JSON.stringify(dashboard, undefined, 2)}</pre>
        {/* <pre>{JSON.stringify(filters, undefined, 2)}</pre> */}
      </div>
    </AuthenticatedLayout>
  );
}
