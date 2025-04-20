"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { honoClient } from "@/client/hono.client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ReviewButtons({ proposalId }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleReviewProposal(status) {
    try {
      setIsLoading(true);
      if (status == "ACCEPTED") {
        const response = await honoClient.api.teachers.proposals[
          ":proposalId"
        ].accept.$post({
          param: {
            proposalId: proposalId,
          },
        });
        if (response.ok) {
          window.location.reload();
        } else {
          toast.error("حدثت مشكلة اثناء مراجعة طلب المشروع");
        }
      }

      if (status == "REJECTED") {
        const response = await honoClient.api.teachers.proposals[
          ":proposalId"
        ].reject.$post({
          param: {
            proposalId: proposalId,
          },
        });
        if (response.ok) {
          window.location.reload();
        } else {
          toast.error("حدثت مشكلة اثناء مراجعة طلب المشروع");
        }
      }
    } catch (error) {
      console.error("Error reviewing proposal:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-full border-red-200 hover:bg-red-50 hover:text-red-600"
        onClick={() => handleReviewProposal("REJECTED")}
        disabled={isLoading}
      >
        <XCircle className="h-4 w-4 ml-2" />
        رفض
      </Button>
      <Button
        className="w-full bg-green-600 hover:bg-green-700"
        onClick={() => handleReviewProposal("ACCEPTED")}
        disabled={isLoading}
      >
        <CheckCircle className="h-4 w-4 ml-2" />
        قبول
      </Button>
    </>
  );
}
