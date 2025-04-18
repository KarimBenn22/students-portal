import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { BookOpen, CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import tryCatch from "@/helpers/trycatch";
import { getStudentProposals } from "@/fetchs/student.fetcher";
import { headers } from "next/headers";
import { withHeaders } from "@/lib/server-utils";

export default async function StudentDashboard() {
  const { data, error } = await tryCatch(
    getStudentProposals({}, await withHeaders())
  );
  const applications = data || [];
  const pendingCount = applications.filter(
    (app) => app.status === "PENDING"
  ).length;
  const acceptedCount = applications.filter(
    (app) => app.status === "ACCEPTED"
  ).length;
  const totalApplications = applications.length;

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Student Dashboard"
        description="Browse projects and manage your applications"
      />
      <PageWrapper.Content>
        <div className="space-y-6 w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Available Projects
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">
                  Browse available projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  My Applications
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalApplications}/3</div>
                <p className="text-xs text-muted-foreground">
                  Applications used (max 3)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{acceptedCount}</div>
                <p className="text-xs text-muted-foreground">
                  Application accepted
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCount}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting response
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>
                Status of your project applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((application, i) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {application.project.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {application.project.author.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </span>
                      {application.status === "PENDING" && (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                      {application.status === "ACCEPTED" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {application.status === "REJECTED" && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/student/applications">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Applications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Slots</CardTitle>
              <CardDescription>
                You can apply to a maximum of 3 projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${(totalApplications / 3) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-4 text-sm font-medium">
                    {totalApplications}/3 used
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    You have {3 - totalApplications} application slot
                    {3 - totalApplications !== 1 ? "s" : ""} remaining. Choose
                    your projects carefully!
                  </p>
                </div>

                <Link href="/student/projects">
                  <Button className="w-full">Browse Available Projects</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
