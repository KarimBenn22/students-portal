import { PageWrapper } from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, CheckCircle, Clock, FileText, Users } from "lucide-react";
export default function TeacherDashboardPage() {
  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Overview"
        description="Overview of your recent activity"
      ></PageWrapper.Header>
      <PageWrapper.Content>
        <div className="space-y-6 w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Applications
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +5 new applications
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Accepted Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  Across 7 projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Reviews
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  Requires your attention
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Latest student applications to your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      project: "AI-Powered Learning Assistant",
                      student: "Alex Johnson",
                      date: "2 days ago",
                      status: "pending",
                    },
                    {
                      project: "Blockchain for Academic Records",
                      student: "Maria Garcia",
                      date: "3 days ago",
                      status: "pending",
                    },
                    {
                      project: "VR Chemistry Lab",
                      student: "James Wilson",
                      date: "5 days ago",
                      status: "accepted",
                    },
                    {
                      project: "AI-Powered Learning Assistant",
                      student: "Sarah Ahmed",
                      date: "1 week ago",
                      status: "rejected",
                    },
                  ].map((application, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {application.student}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {application.project}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {application.date}
                        </span>
                        {application.status === "pending" && (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        {application.status === "accepted" && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {application.status === "rejected" && (
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Popular Projects</CardTitle>
                <CardDescription>
                  Your most applied-to project proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "AI-Powered Learning Assistant",
                      applications: 12,
                      category: "Artificial Intelligence",
                    },
                    {
                      title: "Blockchain for Academic Records",
                      applications: 8,
                      category: "Blockchain",
                    },
                    {
                      title: "VR Chemistry Lab",
                      applications: 7,
                      category: "Virtual Reality",
                    },
                    {
                      title: "Sustainable Campus IoT Network",
                      applications: 5,
                      category: "Internet of Things",
                    },
                  ].map((project, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {project.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {project.category}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {project.applications} applications
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
