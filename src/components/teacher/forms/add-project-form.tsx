"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { tryCatch, handleValidationError, isApiError } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiClient } from "@/api/api-client";
import { useRouter } from "next/navigation";
import { paths } from "@/api/schema";

type ProjectFormValues =
  paths["/teacher/projects"]["post"]["requestBody"]["content"]["application/json"];

type Specialty = ProjectFormValues["specialty"];
const specialties: Specialty[] = [
  "L3 SI",
  "L3 ISIL",
  "M2 SIGL",
  "M2 IA",
  "M2 RTIC",
  "M2 IDO",
];

const defaultValues: ProjectFormValues = {
  title: "",
  description: "",
  specialty: "L3 SI",
  category: "",
};

interface AddProjectFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddProjectForm({ onSuccess, onCancel }: AddProjectFormProps) {
  const [apiError, setApiError] = useState<string>("");
  const form = useForm<ProjectFormValues>({
    defaultValues,
  });
  const router = useRouter();

  const onSubmit = async (values: ProjectFormValues) => {
    setApiError("");
    const api = apiClient();
    const { data, error } = await tryCatch(
      api.POST("/teacher/projects", {
        body: values,
        credentials: "include"
      })
    );

    if (error) {
      toast.error("An unexpected error occurred");
      return;
    }

    if (!data.data) {
      const hasValidationError = handleValidationError(
        data,
        form.setError
      );
      if (hasValidationError) return;

      if (isApiError(data.error)) {
        switch (data.error.code) {
          case "unauthorized":
            router.push("/signin");
            return;
          default:
            toast.error("An unexpected error occurred");
            return;
        }
      }

      toast.error("An unexpected error occurred");
      return;
    }

    toast.success("Project created successfully!");
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {apiError && (
          <Alert variant="destructive">
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter project description"
                  className="min-h-[100px]"
                  {...field}
                />
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
              <FormLabel>Specialty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
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
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter project category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Project</Button>
        </div>
      </form>
    </Form>
  );
}
