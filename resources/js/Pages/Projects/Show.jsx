import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ShowInfoProject } from "@/Components/project/ShowInfoProject";

export default function Show({ auth, project }) {
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
      <div className=" m-2 p-2 bg-white shadow-md rounded-lg">
        <ShowInfoProject project={project.data} />
      </div>
    </AuthenticatedLayout>
  );
}
