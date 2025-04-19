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
import { TeacherProject } from "@/fetchs/teacher.fetcher";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function EditProjectForm({ data, onSuccess }: { data: TeacherProject, onSuccess: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof projectInsertSchema>>({
    defaultValues: {
      title: data.title,
      specialty: data.specialty.replace(" ", "_") as z.infer<
        typeof projectInsertSchema
      >["specialty"],
      description: data.description ?? "",
      category: data.category,
    },
  });

  const specialties = Object.values(Specialty);

  const onSubmit = async (payload: z.infer<typeof projectInsertSchema>) => {
    setLoading(true);
    const response = await honoClient.api.teachers.projects[":id"].$patch({
      param: {
        id: data.id,
      },
      json: payload,
    });
    if (response.ok) {
      onSuccess();
      router.refresh();
    }
    else {
      toast.error("حدثت مشكلة اثناء تعديل المشروع");
      onSuccess(); // only closes modal, name should be refactored
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
          تعديل
        </Button>
      </form>
    </Form>
  );
}

export { EditProjectForm };
