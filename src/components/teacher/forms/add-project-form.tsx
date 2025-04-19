"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectInsertSchema } from "@/lib/schemas/project.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Specialty } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { honoClient } from "@/client/hono.client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

function AddProjectForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof projectInsertSchema>>({
    defaultValues: {
      category: "",
      title: "",
      specialty: "L3_SI",
      description: "",
    },
  });

  const specialties = Object.values(Specialty);

  const onSubmit = async (payload: z.infer<typeof projectInsertSchema>) => {
    setLoading(true);
    const response = await honoClient.api.teachers.projects.$post({ json: payload });
    if (response.ok) {
      onSuccess();
      router.refresh();
    }
    else {
      toast.error("حدثت مشكلة اثناء انشاء مشروع");
      onSuccess(); // this only closes modal tho
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان المشروع</FormLabel>
              <FormControl>
                <Input placeholder="أدخل عنوان المشروع" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف المشروع</FormLabel>
              <FormControl>
                <Textarea className="resize-none" placeholder="أدخل وصف المشروع" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>التخصص</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem value={specialty} key={specialty}>
                      {specialty.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الفئة</FormLabel>
              <FormControl>
                <Input placeholder="أدخل فئة المشروع" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className="float-left" loading={loading}>
          إنشاء
        </Button>
      </form>
    </Form>
  );
}

export { AddProjectForm };
