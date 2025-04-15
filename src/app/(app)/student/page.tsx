import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { BookOpen, CheckCircle, Clock, FileText, XCircle } from "lucide-react"

export default function StudentDashboard() {
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
                <CardTitle className="text-sm font-medium">Available Projects</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">From 15 different teachers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2/3</div>
                <p className="text-xs text-muted-foreground">Applications used (max 3)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Application accepted</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Awaiting response</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Status of your project applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      project: "AI-Powered Learning Assistant",
                      teacher: "Dr. Emily Johnson",
                      date: "2 days ago",
                      status: "pending",
                    },
                    {
                      project: "VR Chemistry Lab",
                      teacher: "Prof. Robert Chen",
                      date: "1 week ago",
                      status: "accepted",
                    },
                  ].map((application, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{application.project}</p>
                        <p className="text-sm text-muted-foreground">{application.teacher}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{application.date}</span>
                        {application.status === "pending" && <Clock className="h-4 w-4 text-yellow-500" />}
                        {application.status === "accepted" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {application.status === "rejected" && <XCircle className="h-4 w-4 text-red-500" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/student/applications">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Applications
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Projects</CardTitle>
                <CardDescription>Projects that match your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Blockchain for Academic Records",
                      teacher: "Dr. Michael Smith",
                      category: "Blockchain",
                    },
                    {
                      title: "Sustainable Campus IoT Network",
                      teacher: "Prof. Sarah Williams",
                      category: "Internet of Things",
                    },
                    {
                      title: "Machine Learning for Climate Data",
                      teacher: "Dr. James Wilson",
                      category: "Machine Learning",
                    },
                  ].map((project, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{project.title}</p>
                        <p className="text-sm text-muted-foreground">{project.teacher}</p>
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-muted">{project.category}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/student/projects">
                    <Button variant="outline" size="sm" className="w-full">
                      Browse All Projects
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Application Slots</CardTitle>
              <CardDescription>You can apply to a maximum of 3 projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "66%" }}></div>
                  </div>
                  <span className="ml-4 text-sm font-medium">2/3 used</span>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>You have 1 application slot remaining. Choose your projects carefully!</p>
                </div>

                <Link href="/dashboard/student/projects">
                  <Button className="w-full">Browse Available Projects</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  )
}
