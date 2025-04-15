"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle, Clock, Eye, XCircle } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";

// Mock data for applications
const initialApplications = [
  {
    id: "1",
    projectTitle: "AI-Powered Learning Assistant",
    studentName: "Alex Johnson",
    studentEmail: "alex.j@university.edu",
    teamMembers: [
      { name: "Sarah Lee", email: "s.lee@university.edu", regNumber: "SL2023" },
      {
        name: "Michael Chen",
        email: "m.chen@university.edu",
        regNumber: "MC2023",
      },
    ],
    proposal:
      "We want to focus on creating an AI assistant that specializes in STEM subjects, with a focus on providing step-by-step explanations for complex problems.",
    status: "pending",
    submittedAt: "2023-04-10",
    feedback: "",
  },
  {
    id: "2",
    projectTitle: "Blockchain for Academic Records",
    studentName: "Maria Garcia",
    studentEmail: "m.garcia@university.edu",
    teamMembers: [
      { name: "David Kim", email: "d.kim@university.edu", regNumber: "DK2023" },
    ],
    proposal:
      "We propose implementing a permissioned blockchain using Hyperledger Fabric to ensure privacy while maintaining the benefits of blockchain technology.",
    status: "pending",
    submittedAt: "2023-04-09",
    feedback: "",
  },
  {
    id: "3",
    projectTitle: "VR Chemistry Lab",
    studentName: "James Wilson",
    studentEmail: "j.wilson@university.edu",
    teamMembers: [
      {
        name: "Emma Brown",
        email: "e.brown@university.edu",
        regNumber: "EB2023",
      },
      {
        name: "Noah Davis",
        email: "n.davis@university.edu",
        regNumber: "ND2023",
      },
      {
        name: "Olivia Miller",
        email: "o.miller@university.edu",
        regNumber: "OM2023",
      },
    ],
    proposal:
      "Our team wants to create a VR chemistry lab that focuses on organic chemistry reactions, with realistic simulations of chemical processes.",
    status: "accepted",
    submittedAt: "2023-04-07",
    feedback:
      "Great proposal! I like the focus on organic chemistry. Let's schedule a meeting to discuss implementation details.",
  },
  {
    id: "4",
    projectTitle: "AI-Powered Learning Assistant",
    studentName: "Sarah Ahmed",
    studentEmail: "s.ahmed@university.edu",
    teamMembers: [
      {
        name: "John Smith",
        email: "j.smith@university.edu",
        regNumber: "JS2023",
      },
    ],
    proposal:
      "We want to build an AI assistant that focuses on language learning, with features for pronunciation feedback and conversation practice.",
    status: "rejected",
    submittedAt: "2023-04-05",
    feedback:
      "While your proposal is interesting, it doesn't align with the technical focus I had in mind for this project. I'd recommend applying to the NLP project instead.",
  },
];

export default function TeacherApplications() {
  const [applications, setApplications] = useState(initialApplications);
  const [currentApplication, setCurrentApplication] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const pendingApplications = applications.filter(
    (app) => app.status === "pending"
  );
  const acceptedApplications = applications.filter(
    (app) => app.status === "accepted"
  );
  const rejectedApplications = applications.filter(
    (app) => app.status === "rejected"
  );

  const handleViewApplication = (application: any) => {
    setCurrentApplication(application);
    setIsViewDialogOpen(true);
  };

  const openFeedbackDialog = (application: any) => {
    setCurrentApplication(application);
    setFeedback(application.feedback);
    setIsFeedbackDialogOpen(true);
  };

  const handleAcceptApplication = () => {
    const updatedApplications = applications.map((app) =>
      app.id === currentApplication.id
        ? { ...app, status: "accepted", feedback }
        : app
    );

    setApplications(updatedApplications);
    setIsFeedbackDialogOpen(false);
    toast("The student has been notified of your decision!");
  };

  const handleRejectApplication = () => {
    const updatedApplications = applications.map((app) =>
      app.id === currentApplication.id
        ? { ...app, status: "rejected", feedback }
        : app
    );

    setApplications(updatedApplications);
    setIsFeedbackDialogOpen(false);
    toast("The student have been notified of your decision!");
  };

  const ApplicationCard = ({ application }: { application: any }) => (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{application.projectTitle}</CardTitle>
          {application.status === "pending" && (
            <Clock className="h-5 w-5 text-yellow-500" />
          )}
          {application.status === "accepted" && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
          {application.status === "rejected" && (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        <CardDescription>
          From: {application.studentName} ({application.studentEmail})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Team Size: {application.teamMembers.length + 1} members
          </p>
          <p className="text-sm text-muted-foreground">
            Submitted: {application.submittedAt}
          </p>
          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewApplication(application)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            {application.status === "pending" ? (
              <Button size="sm" onClick={() => openFeedbackDialog(application)}>
                Review
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openFeedbackDialog(application)}
              >
                View Feedback
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Student Applications"
        description="Review and manage applications to your projects"
      ></PageWrapper.Header>
      <PageWrapper.Content>
        <div className="space-y-6 w-full">
          <Tabs defaultValue="pending">
            <TabsList>
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

            <TabsContent value="pending" className="mt-6">
              {pendingApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No pending applications to review
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="accepted" className="mt-6">
              {acceptedApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No accepted applications yet
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {acceptedApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
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
                  Project: {currentApplication?.projectTitle}
                </DialogDescription>
              </DialogHeader>

              {currentApplication && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Applicant</h3>
                    <p>
                      {currentApplication.studentName} (
                      {currentApplication.studentEmail})
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Team Members</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {currentApplication.teamMembers.map(
                        (member: any, index: number) => (
                          <li key={index}>
                            {member.name} ({member.email}) - {member.regNumber}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium">Proposal</h3>
                    <p className="text-sm">{currentApplication.proposal}</p>
                  </div>

                  <div>
                    <h3 className="font-medium">Status</h3>
                    <div className="flex items-center gap-2">
                      {currentApplication.status === "pending" && (
                        <>
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span>Pending Review</span>
                        </>
                      )}
                      {currentApplication.status === "accepted" && (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Accepted</span>
                        </>
                      )}
                      {currentApplication.status === "rejected" && (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span>Rejected</span>
                        </>
                      )}
                    </div>
                  </div>

                  {currentApplication.feedback && (
                    <div>
                      <h3 className="font-medium">Feedback</h3>
                      <p className="text-sm">{currentApplication.feedback}</p>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Feedback Dialog */}
          <Dialog
            open={isFeedbackDialogOpen}
            onOpenChange={setIsFeedbackDialogOpen}
          >
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>
                  {currentApplication?.status === "pending"
                    ? "Review Application"
                    : "Application Feedback"}
                </DialogTitle>
                <DialogDescription>
                  {currentApplication?.status === "pending"
                    ? "Provide feedback and make a decision on this application"
                    : "View the feedback provided for this application"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    rows={5}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    readOnly={currentApplication?.status !== "pending"}
                    placeholder="Provide feedback to the student about their application..."
                  />
                </div>
              </div>

              {currentApplication?.status === "pending" ? (
                <DialogFooter className="flex justify-between sm:justify-between">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleRejectApplication}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button type="button" onClick={handleAcceptApplication}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                </DialogFooter>
              ) : (
                <DialogFooter>
                  <Button
                    type="button"
                    onClick={() => setIsFeedbackDialogOpen(false)}
                  >
                    Close
                  </Button>
                </DialogFooter>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
