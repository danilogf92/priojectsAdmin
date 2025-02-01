// pages/Projects/Create.jsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreateProjectForm from "@/Components/project/CreateProjectForm";

export default function Create({
  auth,
  plants,
  currentUser, // Usuario actual
  states,
  justifications,
  investments,
  classifications,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create Project
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
      <Head title="Create Project" />
      <div className="p-6 bg-white shadow-md rounded-lg">
        <CreateProjectForm
          plants={plants}
          currentUser={currentUser} // Pasar el usuario actual al formulario
          states={states}
          justifications={justifications}
          investments={investments}
          classifications={classifications}
        />
      </div>
    </AuthenticatedLayout>
  );
}
