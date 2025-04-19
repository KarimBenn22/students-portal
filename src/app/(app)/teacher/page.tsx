import { honoClient } from "@/client/hono.client";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { withHeaders } from "@/lib/server-utils";
import { BookOpen, CheckCircle, Clock, FileText, Users } from "lucide-react";
import Link from "next/link";

export default async function TeacherDashboardPage() {
  let projectsCount = 0;
  let acceptedCount = 0;
  let pendingCount = 0;
  let activeCount = 0;
  let recentProposals: any[] = [];
  let popularProjects: any[] = [];

  try {
    const headers = await withHeaders();

    const [
      projectsCountRes,
      popularProjectsRes,
      recentProposalsRes,
      acceptedCountRes,
      pendingCountRes,
      activeCountRes,
    ] = await Promise.all([
      honoClient.api.teachers.projects.count.$get({}, { headers }),
      honoClient.api.teachers.projects.popular.$get({}, { headers }),
      honoClient.api.teachers.proposals.recent.$get({}, { headers }),
      honoClient.api.teachers.proposals.accepted.$get({}, { headers }),
      honoClient.api.teachers.proposals.active.$get({}, { headers }),
      honoClient.api.teachers.proposals.pending.$get({}, { headers }),
    ]);

    projectsCount = (await projectsCountRes.json()).projectsCount;
    popularProjects = await popularProjectsRes.json();
    recentProposals = (await recentProposalsRes.json()).proposals;
    acceptedCount = (await acceptedCountRes.json()).proposals.length;
    pendingCount = (await pendingCountRes.json()).proposals.length;
    activeCount = (await activeCountRes.json()).proposals.length;
  } catch (error) {
    console.error("Dashboard fetch error:", error);
  }

  return (
    <PageWrapper>
      <PageWrapper.Header title="نظرة عامة" description="ملخص لآخر أنشطتك" />
      <PageWrapper.Content>
        <div dir="rtl" className="space-y-6 w-full text-right font-sans">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
              title="عدد المشاريع"
              value={projectsCount}
              hint="مشروع"
            />
            <DashboardCard
              icon={<FileText className="h-4 w-4 text-muted-foreground" />}
              title="الطلبات النشطة"
              value={activeCount}
              hint="طلبات"
            />
            <DashboardCard
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              title="الطلاب المقبولون"
              value={acceptedCount}
              hint="طالبا مقبولا"
            />
            <DashboardCard
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
              title="المراجعات المعلقة"
              value={pendingCount}
              hint="تحتاج إلى انتباهك"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1 shadow-none">
              <CardHeader>
                <CardTitle>الطلبات الأخيرة</CardTitle>
                <CardDescription>أحدث طلبات الطلاب لمشاريعك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(recentProposals as any[]).map((application, i) => (
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
                  <Button size="sm" className="shadow-none w-full" variant="secondary">
                    <Link href="/teacher/applications">عرض جميع الطلبات</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 shadow-none">
              <CardHeader>
                <CardTitle>المشاريع الشائعة</CardTitle>
                <CardDescription>
                  أكثر مشاريعك طلبًا من قبل الطلاب
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(popularProjects as any[]).map((project, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {project.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {project.category}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button size="sm" className="shadow-none w-full" variant="secondary">
                    <Link href="/teacher/projects">عرض جميع المشاريع</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  hint: string;
}) {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}
