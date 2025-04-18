import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StudentProposal } from "@/fetchs/student.fetcher";
import { CheckCircle, Clock, Eye, XCircle } from "lucide-react";

type ApplicationCardProps = {
  application: StudentProposal[0];
  onViewDetails: (application: ApplicationCardProps["application"]) => void;
};

export function ApplicationCard({
  application,
  onViewDetails,
}: ApplicationCardProps) {
  const statusConfig = {
    PENDING: {
      color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
      icon: Clock,
    },
    ACCEPTED: {
      color: "text-green-500 bg-green-500/10 border-green-500/20",
      icon: CheckCircle,
    },
    REJECTED: {
      color: "text-red-500 bg-red-500/10 border-red-500/20",
      icon: XCircle,
    },
  };

  const StatusIcon = statusConfig[application.status].icon;

  return (
    <Card className="group transition-all duration-200 hover:shadow-lg hover:border-primary/20">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {application.project.title}
          </CardTitle>
          <Badge
            variant="outline"
            className={`${statusConfig[application.status].color}`}
          >
            <StatusIcon className="mr-1 h-3 w-3" />
            {application.status.charAt(0) +
              application.status.slice(1).toLowerCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-muted/50">
            {application.project.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            by {application.project.author.name}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {application.project.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            Submitted: {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
