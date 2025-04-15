import { PageWrapper } from "@/components/layout/page-wrapper";

export default function TeacherDashboardPage() {
  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Overview"
        description="Overview of your recent activity"
      ></PageWrapper.Header>
      <PageWrapper.Content></PageWrapper.Content>
    </PageWrapper>
  );
}
