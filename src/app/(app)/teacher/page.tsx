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
import {
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function TeacherDashboardPage() {
  // fetchers
  const r = await honoClient.api.teachers.projects.count.$get({}, {
    headers: await withHeaders()
  });
  const r1 = await honoClient.api.teachers.projects.popular.$get({}, {
    headers: await withHeaders()
  })
  cosnt r2 = await honoClient.api.teachers.
  console.log(await r.json())
  console.log("r1: ", await r1.json());
  return (
    <PageWrapper>
      <PageWrapper.Header
        title="نظرة عامة"
        description="ملخص لآخر أنشطتك"
      />
      <PageWrapper.Content>
        <div dir="rtl" className="space-y-6 w-full text-right font-sans">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  عدد المشاريع
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">١٢</div>
                <p className="text-xs text-muted-foreground">
                  +٢ عن الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  الطلبات النشطة
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">٢٤</div>
                <p className="text-xs text-muted-foreground">
                  +٥ طلبات جديدة
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  الطلاب المقبولون
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">١٨</div>
                <p className="text-xs text-muted-foreground">
                  موزعين على ٧ مشاريع
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المراجعات المعلقة
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">٧</div>
                <p className="text-xs text-muted-foreground">
                  تحتاج إلى انتباهك
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1 shadow-none">
              <CardHeader>
                <CardTitle>الطلبات الأخيرة</CardTitle>
                <CardDescription>
                  أحدث طلبات الطلاب لمشاريعك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      project: "مساعد تعليمي مدعوم بالذكاء الاصطناعي",
                      student: "أليكس جونسون",
                      date: "منذ يومين",
                      status: "pending",
                    },
                    {
                      project: "البلوك تشين للسجلات الأكاديمية",
                      student: "ماريا غارسيا",
                      date: "منذ ٣ أيام",
                      status: "pending",
                    },
                    {
                      project: "مختبر الكيمياء بالواقع الافتراضي",
                      student: "جيمس ويلسون",
                      date: "منذ ٥ أيام",
                      status: "accepted",
                    },
                    {
                      project: "مساعد تعليمي مدعوم بالذكاء الاصطناعي",
                      student: "سارة أحمد",
                      date: "منذ أسبوع",
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
                  {[
                    {
                      title: "مساعد تعليمي مدعوم بالذكاء الاصطناعي",
                      applications: 12,
                      category: "الذكاء الاصطناعي",
                    },
                    {
                      title: "البلوك تشين للسجلات الأكاديمية",
                      applications: 8,
                      category: "البلوك تشين",
                    },
                    {
                      title: "مختبر الكيمياء بالواقع الافتراضي",
                      applications: 7,
                      category: "الواقع الافتراضي",
                    },
                    {
                      title: "شبكة إنترنت الأشياء لحرم جامعي مستدام",
                      applications: 5,
                      category: "إنترنت الأشياء",
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
                        {project.applications} طلب
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
