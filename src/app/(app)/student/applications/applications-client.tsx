"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { ApplicationCard } from "@/components/student/application-card";

type Application = {
  id: string;
  projectId: string;
  projectTitle: string;
  teacher: string;
  proposal: string;
  teamMembers: Array<{
    name: string;
    email: string;
    regNumber: string;
  }>;
  submittedAt: string;
  status: "pending" | "accepted" | "rejected";
  feedback: string;
};

type ApplicationsClientProps = {
  initialApplications: Application[];
};

export function ApplicationsClient({
  initialApplications,
}: ApplicationsClientProps) {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const pendingApplications = initialApplications.filter(
    (app) => app.status === "pending"
  );
  const acceptedApplications = initialApplications.filter(
    (app) => app.status === "accepted"
  );
  const rejectedApplications = initialApplications.filter(
    (app) => app.status === "rejected"
  );

  const handleViewApplication = (application: Application) => {
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

          {/* View Application Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  Project: {selectedApplication?.projectTitle}
                </DialogDescription>
              </DialogHeader>

              {selectedApplication && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Teacher</h3>
                    <p>{selectedApplication.teacher}</p>
                  </div>

                  <div>
                    <h3 className="font-medium">Your Proposal</h3>
                    <p className="text-sm">{selectedApplication.proposal}</p>
                  </div>

                  <div>
                    <h3 className="font-medium">Team Members</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedApplication.teamMembers.map((member, index) => (
                        <li key={index}>
                          {member.name} ({member.email}) - {member.regNumber}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium">Status</h3>
                    <div className="flex items-center gap-2">
                      {selectedApplication.status === "pending" && (
                        <>
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span>Pending Review</span>
                        </>
                      )}
                      {selectedApplication.status === "accepted" && (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Accepted</span>
                        </>
                      )}
                      {selectedApplication.status === "rejected" && (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span>Rejected</span>
                        </>
                      )}
                    </div>
                  </div>

                  {selectedApplication.feedback && (
                    <div>
                      <h3 className="font-medium">Teacher Feedback</h3>
                      <p className="text-sm">{selectedApplication.feedback}</p>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
