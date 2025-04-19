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
import { withHeaders } from "@/lib/server-utils";
import { honoClient } from "@/client/hono.client";

export default async function StudentDashboard() {
  const { data, error } = await tryCatch(
    getStudentProposals({}, await withHeaders())
  );
  const { data: count, error: countError } = await tryCatch(
    honoClient.api.students.projects.count.$get(
      {},
      { headers: await withHeaders() }
    )
  );
  const projectCount = await count?.json();
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
        title="لوحة تحكم الطالب"
        description="تصفح المشاريع وإدارة طلباتك"
      />
      <PageWrapper.Content>
        <div
          className="space-y-6 w-full **:data-[slot=card]:shadow-none **:data-[slot=card]:rounded-sm"
          dir="rtl"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المشاريع المتاحة
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {projectCount?.count || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  تصفح المشاريع المتاحة
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">طلباتي</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalApplications}/3</div>
                <p className="text-xs text-muted-foreground">
                  الطلبات المستخدمة (الحد الأقصى 3)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المقبولة</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{acceptedCount}</div>
                <p className="text-xs text-muted-foreground">
                  الطلبات المقبولة
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  قيد الانتظار
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCount}</div>
                <p className="text-xs text-muted-foreground">في انتظار الرد</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>طلباتي</CardTitle>
                <CardDescription>حالة طلبات المشاريع الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full justify-between">
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
                <div className="mt-6">
                  <Link href="/student/applications">
                    <Button variant="outline" size="sm" className="w-full">
                      عرض جميع الطلبات
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>فتحات الطلبات</CardTitle>
                <CardDescription>
                  يمكنك التقدم إلى 3 مشاريع كحد أقصى
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
                    <span className="mr-4 text-sm font-medium">
                      {totalApplications}/3 مستخدم
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>
                      لديك {3 - totalApplications} فتحة
                      {3 - totalApplications !== 1 ? " فتحات" : ""} متبقية. اختر
                      مشاريعك بعناية!
                    </p>
                  </div>

                  <Link href="/student/projects">
                    <Button size="sm" className="w-full">
                      تصفح المشاريع المتاحة
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
