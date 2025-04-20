import { honoClient } from "@/client/hono.client";
import { withHeaders } from "@/lib/server-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, LockIcon } from "lucide-react";
import ReviewButtons from "./review-buttons";
import timeAgo from "@/lib/utils";

export default async function TeacherApplicationsPage() {
  const response = await honoClient.api.teachers.proposals.$get(
    {},
    {
      headers: await withHeaders(),
    }
  );

  const data = await response.json();
  const { proposals } = data;

  return (
    <div dir="rtl" className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">مراجعة مقترحات الطلاب</h1>
      {proposals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            لا توجد مقترحات للمراجعة حالياً
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProposalCard({ proposal }) {
  const statusMap = {
    PENDING: {
      label: "قيد الانتظار",
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    ACCEPTED: {
      label: "مقبول",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    REJECTED: {
      label: "مرفوض",
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  };

  const status = statusMap[proposal.status];
  const isPending = proposal.status === "PENDING";
  const isLockedIn = proposal.status === "ACCEPTED" && proposal.lockedIn;
  const formattedDate = timeAgo(new Date(proposal.createdAt));

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">
            {proposal.project.title || "مشروع بدون عنوان"}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={status.color}>
              <status.icon className="h-4 w-4 ml-1" />
              {status.label}
            </Badge>
            {isLockedIn && (
              <Badge className="bg-blue-100 text-blue-800">
                <LockIcon className="h-4 w-4 ml-1" />
                مثبت
              </Badge>
            )}
          </div>
        </div>
        <CardDescription>
          تم التقديم بواسطة: {proposal.proposer.name || "طالب"}
        </CardDescription>
        <CardDescription>تاريخ التقديم: {formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-semibold">تفاصيل المشروع:</h3>
          <p className="text-sm text-muted-foreground">
            {proposal.project.description || "لا يوجد وصف للمشروع"}
          </p>
        </div>
      </CardContent>
      {isPending && (
        <CardFooter className="flex justify-between gap-2">
          <ReviewButtons proposalId={proposal.id} />
        </CardFooter>
      )}
    </Card>
  );
}
