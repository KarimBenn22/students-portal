"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { StudentProposal } from "@/fetchs/student.fetcher"
import { CheckCircle, Clock, Eye, LockIcon, UnlockIcon, XCircle, XIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type ApplicationCardProps = {
  application: StudentProposal[0]
  onViewDetails: (application: ApplicationCardProps["application"]) => void
  onCancelProposal?: (proposalId: string) => Promise<void>
  onLockInProposal?: (proposalId: string) => Promise<void>
  onUnlockProposal?: (proposalId: string) => Promise<void>
  hasLockedInProposal: boolean
}

export function ApplicationCard({
  application,
  onViewDetails,
  onCancelProposal,
  onLockInProposal,
  onUnlockProposal,
  hasLockedInProposal,
}: ApplicationCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const statusConfig = {
    PENDING: {
      label: "قيد المراجعة",
      color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
      icon: Clock,
    },
    ACCEPTED: {
      label: "مقبول",
      color: "text-green-500 bg-green-500/10 border-green-500/20",
      icon: CheckCircle,
    },
    REJECTED: {
      label: "مرفوض",
      color: "text-red-500 bg-red-500/10 border-red-500/20",
      icon: XCircle,
    },
  }

  const StatusIcon = statusConfig[application.status].icon
  const isAccepted = application.status === "ACCEPTED"
  const isLockedIn = application.lockedIn
  const canLockIn = isAccepted && !isLockedIn && !hasLockedInProposal
  const canUnlock = isAccepted && isLockedIn
  const canCancel = !isLockedIn

  const handleCancelProposal = async () => {
    if (!onCancelProposal) return
    try {
      setIsLoading(true)
      await onCancelProposal(application.id)
    } catch (error) {
      console.error("Error cancelling proposal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLockInProposal = async () => {
    if (!onLockInProposal) return
    try {
      setIsLoading(true)
      await onLockInProposal(application.id)
    } catch (error) {
      console.error("Error locking in proposal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnlockProposal = async () => {
    if (!onUnlockProposal) return
    try {
      setIsLoading(true)
      await onUnlockProposal(application.id)
    } catch (error) {
      console.error("Error unlocking proposal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-none">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{application.project.title}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className={`${statusConfig[application.status].color}`}>
              <StatusIcon className="ml-1 h-3 w-3" />
              {statusConfig[application.status].label}
            </Badge>
            {isLockedIn && (
              <Badge variant="outline" className="text-blue-500 bg-blue-500/10 border-blue-500/20">
                <LockIcon className="ml-1 h-3 w-3" />
                مثبت
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-muted/50">
            {application.project.category}
          </Badge>
          <span className="text-sm text-muted-foreground">بواسطة {application.project.author.name}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{application.project.description}</p>
        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            تاريخ التقديم: {new Date(application.createdAt).toLocaleDateString()}
          </p>
          <Button variant="ghost" size="sm" onClick={() => onViewDetails(application)}>
            <Eye className="ml-1 h-4 w-4" />
            عرض التفاصيل
          </Button>
        </div>
      </CardContent>
      {(canCancel || canLockIn || canUnlock) && (
        <CardFooter className="flex gap-2 pt-0">
          {canCancel && (
            <Button
              variant="destructive"
              size="sm"
              className={cn("flex-1", isLoading && "opacity-50")}
              onClick={handleCancelProposal}
              disabled={isLoading}
            >
              <XIcon className="ml-1 h-4 w-4" />
              إلغاء الطلب
            </Button>
          )}
          {canLockIn && (
            <Button
              variant="default"
              size="sm"
              className={cn("flex-1", isLoading && "opacity-50")}
              onClick={handleLockInProposal}
              disabled={isLoading}
            >
              <LockIcon className="ml-1 h-4 w-4" />
              تثبيت المشروع
            </Button>
          )}
          {canUnlock && (
            <Button
              variant="outline"
              size="sm"
              className={cn("flex-1", isLoading && "opacity-50")}
              onClick={handleUnlockProposal}
              disabled={isLoading}
            >
              <UnlockIcon className="ml-1 h-4 w-4" />
              إلغاء التثبيت
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
