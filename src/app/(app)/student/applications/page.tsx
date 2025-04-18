import { getStudentProposals } from "@/fetchs/student.fetcher";
import { ApplicationsClient } from "./applications-client";
import { withHeaders } from "@/lib/server-utils";

export default async function ApplicationsPage() {
  const applications = await getStudentProposals({}, await withHeaders());
  console.log(applications);
  return (
    <ApplicationsClient initialApplications={applications}></ApplicationsClient>
  );
}
