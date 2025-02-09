import React from "react";
import ImportExcelData from "./ImportExcelData";
import DeleteExcelData from "./DeleteExcelData";

export const ShowInfoProject = ({ project }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">{project.name}</h1>
      <div className="mt-4 space-y-2">
        <p>
          <strong>PDA Code:</strong> {project.code}
        </p>
        <p>
          <strong>File:</strong>
        </p>
        {Boolean(project.file) ? (
          <DeleteExcelData project={project} />
        ) : (
          <ImportExcelData project={project} />
        )}

        <p>
          <strong>Rate:</strong> {project.rate}
        </p>
        <p>
          <strong>Plant:</strong> {project.plant}
        </p>
        <p>
          <strong>User:</strong> {project.user}
        </p>
        <p>
          <strong>State:</strong> {project.state}
        </p>
        <p>
          <strong>Justification:</strong> {project.justification}
        </p>
        <p>
          <strong>Investment:</strong> {project.investment}
        </p>
        <p>
          <strong>Classification:</strong> {project.classification}
        </p>
        <p>
          <strong>Start Date:</strong> {project.start_date}
        </p>
        <p>
          <strong>Finish Date:</strong> {project.finish_date}
        </p>
      </div>

      {/* <pre>{JSON.stringify(project, undefined, 2)}</pre> */}
    </>
  );
};
