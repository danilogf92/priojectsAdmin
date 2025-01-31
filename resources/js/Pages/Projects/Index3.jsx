import ProjectFilter from "@/Components/projects/ProjectFilter";
import ProjectsTable from "@/Components/projects/ProjectsTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { ProjectsProvider } from "@/context/ProjectsContext2";

export default function Index({ auth, projects, plants }) {
  return (
    <ProjectsProvider>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="text-xl font-semibold">Projects</h2>}
      >
        <ProjectFilter plants={plants} />
        <ProjectsTable projects={projects.data} />

        {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}
      </AuthenticatedLayout>
    </ProjectsProvider>
  );
}
