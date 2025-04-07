import { honoClient } from "@/client/hono.client";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { AddEditProjectModal } from "@/components/teacher/modals/add-project.modal";
import { ProjectsList } from "@/components/teacher/project-list";
import { headers } from "next/headers";

export default async function TeacherProjectsPage() {
  const incomingHeaders = await headers();
  const headerObject: Record<string, string> = {};
  incomingHeaders.forEach((value, key) => {
    headerObject[key] = value;
  });

  const response = await honoClient.api.teachers.projects.$get(
    {},
    {
      headers: headerObject,
    }
  );

  const apiProjects = await response.json();
  
  // TODO: Clean up this section
  const projects = apiProjects.map((project: any) => ({
    ...project,
    speciality: project.specialty.replace("_"," "),
    createdAt: new Date(project.createdAt)
  }));
  console.log(projects);

  return (
    <PageWrapper>
    <PageWrapper.Header
        title="Projects"
        description="Manage your available projects"
      >
        <AddEditProjectModal mode="add"></AddEditProjectModal>
      </PageWrapper.Header>
      <PageWrapper.Content>
        <ProjectsList initialProjects={projects}></ProjectsList>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
