"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { CheckCircle, Clock, Eye, XCircle } from "lucide-react"

// Mock data for student's applications
const studentApplications = [
  {
    id: "1",
    projectId: "1",
    projectTitle: "AI-Powered Learning Assistant",
    teacher: "Dr. Emily Johnson",
    proposal:
      "We want to focus on creating an AI assistant that specializes in STEM subjects, with a focus on providing step-by-step explanations for complex problems.",
    teamMembers: [
      { name: "Sarah Lee", email: "s.lee@university.edu", regNumber: "SL2023" },
      { name: "Michael Chen", email: "m.chen@university.edu", regNumber: "MC2023" },
    ],
    submittedAt: "2023-04-10",
    status: "pending",
    feedback: "",
  },
  {
    id: "2",
    projectId: "3",
    projectTitle: "VR Chemistry Lab",
    teacher: "Prof. Robert Chen",
    proposal:
      "Our team wants to create a VR chemistry lab that focuses on organic chemistry reactions, with realistic simulations of chemical processes.",
    teamMembers: [{ name: "Emma Brown", email: "e.brown@university.edu", regNumber: "EB2023" }],
    submittedAt: "2023-04-07",
    status: "accepted",
    feedback:
      "Great proposal! I like the focus on organic chemistry. Let's schedule a meeting to discuss implementation details.",
  },
]

export default function StudentApplications() {
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const pendingApplications = studentApplications.filter((app) => app.status === "pending")
  const acceptedApplications = studentApplications.filter((app) => app.status === "accepted")
  const rejectedApplications = studentApplications.filter((app) => app.status === "rejected")

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application)
    setIsViewDialogOpen(true)
  }

  const ApplicationCard = ({ application }: { application: any }) => (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{application.projectTitle}</CardTitle>
          {application.status === "pending" && <Clock className="h-5 w-5 text-yellow-500" />}
          {application.status === "accepted" && <CheckCircle className="h-5 w-5 text-green-500" />}
          {application.status === "rejected" && <XCircle className="h-5 w-5 text-red-500" />}
        </div>
        <CardDescription>Teacher: {application.teacher}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Team Size: {application.teamMembers.length + 1} members</p>
          <p className="text-sm text-muted-foreground">Submitted: {application.submittedAt}</p>
          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => handleViewApplication(application)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

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
              <TabsTrigger value="all">All ({studentApplications.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({acceptedApplications.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {studentApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">You haven't applied to any projects yet</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {studentApplications.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              {pendingApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No pending applications</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingApplications.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="accepted" className="mt-6">
              {acceptedApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No accepted applications</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {acceptedApplications.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rejected" className="mt-6">
              {rejectedApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No rejected applications</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rejectedApplications.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
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
                <DialogDescription>Project: {selectedApplication?.projectTitle}</DialogDescription>
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
                      {selectedApplication.teamMembers.map((member: any, index: number) => (
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
  )
}
