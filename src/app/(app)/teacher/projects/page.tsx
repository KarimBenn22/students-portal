import { PageWrapper } from "@/components/layout/page-wrapper";
import { AddEditProjectModal } from "@/components/teacher/modals/add-project.modal";
import { ProjectsList } from "@/components/teacher/project-list";
import { getTeacherProjects } from "@/fetchs/teacher.fetcher";
import { withHeaders } from "@/lib/server-utils";

export default async function TeacherProjectsPage() {
  const headers = await withHeaders();
  const projects = await getTeacherProjects({}, headers);

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Projects"
        description="Manage your available projects"
      >
        <AddEditProjectModal mode="add" />
      </PageWrapper.Header>
      <PageWrapper.Content>
        <ProjectsList initialProjects={projects} />
      </PageWrapper.Content>
    </PageWrapper>
  );
}
