import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Eye, XCircle } from "lucide-react"

type ApplicationCardProps = {
  application: {
    id: string
    projectId: string
    projectTitle: string
    teacher: string
    proposal: string
    teamMembers: Array<{
      name: string
      email: string
      regNumber: string
    }>
    submittedAt: string
    status: "pending" | "accepted" | "rejected"
    feedback: string
  }
  onViewDetails: (application: ApplicationCardProps["application"]) => void
}

export function ApplicationCard({ application, onViewDetails }: ApplicationCardProps) {
  return (
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
            <Button variant="outline" size="sm" onClick={() => onViewDetails(application)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}