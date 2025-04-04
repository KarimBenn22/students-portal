import { PageWrapper } from "@/components/layout/page-wrapper";
import { AddProjectModal } from "@/components/teacher/modals/add-project.modal";

export default function TeacherProjectsPage() {
  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Projects"
        description="Manage your available projects"
      ></PageWrapper.Header>
      <PageWrapper.Content>
        <AddProjectModal></AddProjectModal>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
