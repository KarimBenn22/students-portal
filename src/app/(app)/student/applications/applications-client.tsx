"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApplicationCard } from "@/components/student/application-card"
import type { StudentProposal } from "@/fetchs/student.fetcher"
import { toast } from "sonner"
import { honoClient } from "@/client/hono.client"

type ApplicationsClientProps = {
  initialApplications: StudentProposal
}

export function ApplicationsClient({ initialApplications }: ApplicationsClientProps) {
  const [applications, setApplications] = useState<StudentProposal>(initialApplications)
  const [selectedApplication, setSelectedApplication] = useState<StudentProposal[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const pendingApplications = applications.filter((app) => app.status === "PENDING")
  const acceptedApplications = applications.filter((app) => app.status === "ACCEPTED")
  const rejectedApplications = applications.filter((app) => app.status === "REJECTED")

  // Check if there's already a locked in proposal
  const hasLockedInProposal = applications.some((app) => app.lockedIn)

  const handleViewApplication = (application: StudentProposal[0]) => {
    setSelectedApplication(application)
    setIsViewDialogOpen(true)
  }

  const handleCancelProposal = async (proposalId: string) => {
    try {
      setIsLoading(true)
      await honoClient.api.students.proposals[":id"].$delete({
        param: {
          id: proposalId,
        },
      })
      setApplications(applications.filter((app) => app.id !== proposalId))
      toast("تم إلغاء طلبك بنجاح")
    } catch (error) {
      console.error("Error cancelling proposal:", error)
      toast("حدث خطأ أثناء إلغاء الطلب")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLockInProposal = async (proposalId: string) => {
    try {
      setIsLoading(true)
      await honoClient.api.students.proposals[":proposalId"]["lock-in"].$post({
        param: {
          proposalId: proposalId,
        },
      })
      const updatedApplications = applications.map((app) => 
        app.id === proposalId ? { ...app, lockedIn: true } : app
      )
      setApplications(updatedApplications)
      toast("تم تثبيت المشروع بنجاح")
    } catch (error) {
      console.error("Error locking in proposal:", error)
      toast("حدث خطأ أثناء تثبيت المشروع")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnlockProposal = async (proposalId: string) => {
    try {
      setIsLoading(true)
      await honoClient.api.students.proposals[":proposalId"]["unlock-in"].$post({
        param: {
          proposalId: proposalId,
        },
      })
      const updatedApplications = applications.map((app) => 
        app.id === proposalId ? { ...app, lockedIn: false } : app
      )
      setApplications(updatedApplications)
      toast("تم إلغاء تثبيت المشروع بنجاح")
    } catch (error) {
      console.error("Error unlocking proposal:", error)
      toast("حدث خطأ أثناء إلغاء تثبيت المشروع")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageWrapper>
      <PageWrapper.Header title="طلباتي" description="تتبع حالة طلبات مشاريعك" />

      <PageWrapper.Content>
        <div className="space-y-6 w-full">
          <Tabs defaultValue="all">
            <TabsList className="flex-row-reverse">
              <TabsTrigger value="all">الكل ({applications.length})</TabsTrigger>
              <TabsTrigger value="pending">قيد المراجعة ({pendingApplications.length})</TabsTrigger>
              <TabsTrigger value="accepted">مقبول ({acceptedApplications.length})</TabsTrigger>
              <TabsTrigger value="rejected">مرفوض ({rejectedApplications.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {applications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">لم تقم بتقديم أي طلبات حتى الآن</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" dir="rtl">
                  {applications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewDetails={handleViewApplication}
                      onCancelProposal={handleCancelProposal}
                      onLockInProposal={handleLockInProposal}
                      onUnlockProposal={handleUnlockProposal}
                      hasLockedInProposal={hasLockedInProposal}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              {pendingApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">لا توجد طلبات قيد المراجعة</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" dir="rtl">
                  {pendingApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewDetails={handleViewApplication}
                      onCancelProposal={handleCancelProposal}
                      onLockInProposal={handleLockInProposal}
                      onUnlockProposal={handleUnlockProposal}
                      hasLockedInProposal={hasLockedInProposal}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="accepted" className="mt-6">
              {acceptedApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">لا توجد طلبات مقبولة</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" dir="rtl">
                  {acceptedApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewDetails={handleViewApplication}
                      onCancelProposal={handleCancelProposal}
                      onLockInProposal={handleLockInProposal}
                      onUnlockProposal={handleUnlockProposal}
                      hasLockedInProposal={hasLockedInProposal}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rejected" className="mt-6">
              {rejectedApplications.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">لا توجد طلبات مرفوضة</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" dir="rtl">
                  {rejectedApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewDetails={handleViewApplication}
                      onCancelProposal={handleCancelProposal}
                      onLockInProposal={handleLockInProposal}
                      onUnlockProposal={handleUnlockProposal}
                      hasLockedInProposal={hasLockedInProposal}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  )
}
