// components/ProjectsTable.jsx
import React from "react";
import { Link } from "@inertiajs/react";

export default function ProjectsTable({
  projects,
  auth,
  setProjectToDelete,
  setIsDeleteModalOpen,
}) {
  return (
    <div className="m-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-50 rounded-lg">
        <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 rounded-lg">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Pda
            </th>
            <th scope="col" className="px-6 py-3">
              File
            </th>
            <th scope="col" className="px-6 py-3">
              Rate
            </th>
            <th scope="col" className="px-6 py-3">
              Plant
            </th>
            <th scope="col" className="px-6 py-3">
              State
            </th>
            <th scope="col" className="px-6 py-3">
              Justification
            </th>
            <th scope="col" className="px-6 py-3">
              Investment
            </th>
            <th scope="col" className="px-6 py-3">
              Classification
            </th>
            <th scope="col" className="px-6 py-3">
              Start date
            </th>
            <th scope="col" className="px-6 py-3">
              Finish date
            </th>
            {auth.user.roles.includes("Project") && (
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {projects.data.map((project, index) => (
            <tr
              key={project.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
            >
              <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {project.name}
              </td>
              <td className="px-6 py-2">{project.code}</td>
              <td className="px-6 py-2">{project.file}</td>
              <td className="px-6 py-2">{project.rate}</td>
              <td className="px-6 py-2">{project.plant}</td>
              <td className="px-6 py-2">{project.state}</td>
              <td className="px-6 py-2">{project.justification}</td>
              <td className="px-6 py-2">{project.investment}</td>
              <td className="px-6 py-2">{project.classification}</td>
              <td className="px-6 py-2">{project.start_date}</td>
              <td className="px-6 py-2">{project.finish_date}</td>
              {auth.user.roles.includes("Project") && (
                <td className="py-2 text-center">
                  <Link
                    className="font-medium text-amber-600 dark:text-amber-500 hover:underline mr-4"
                    href={route("projects.edit", project.id)}
                  >
                    Edit
                  </Link>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => {
                      setProjectToDelete(project);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
