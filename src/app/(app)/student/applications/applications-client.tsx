"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationCard } from "@/components/student/application-card";
import { StudentProposal } from "@/fetchs/student.fetcher";

type ApplicationsClientProps = {
  initialApplications: StudentProposal;
};

export function ApplicationsClient({
  initialApplications,
}: ApplicationsClientProps) {
  const [selectedApplication, setSelectedApplication] = useState<
    StudentProposal[0] | null
  >(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const pendingApplications = initialApplications.filter(
    (app) => app.status === "PENDING"
  );
  const acceptedApplications = initialApplications.filter(
    (app) => app.status === "ACCEPTED"
  );
  const rejectedApplications = initialApplications.filter(
    (app) => app.status === "REJECTED"
  );

  const handleViewApplication = (application: StudentProposal[0]) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="My Applications"
        description="Track the status of your project applications"
      />
      <PageWrapper.Content>
        <div className="space-y-6 w-full">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">
                All ({initialApplications.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingApplications.length})
              </TabsTrigger>
              <TabsTrigger value="accepted">
                Accepted ({acceptedApplications.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({rejectedApplications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {initialApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  You haven't applied to any projects yet
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {initialApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewDetails={handleViewApplication}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              {pendingApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No pending applications
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewDetails={handleViewApplication}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="accepted" className="mt-6">
              {acceptedApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No accepted applications
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {acceptedApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewDetails={handleViewApplication}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rejected" className="mt-6">
              {rejectedApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No rejected applications
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rejectedApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewDetails={handleViewApplication}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
