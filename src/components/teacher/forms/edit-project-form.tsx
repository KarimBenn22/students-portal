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
import { ProjectCardProps } from "../project-card";

function EditProjectForm(data: ProjectCardProps) {
  console.log("category: ", data.speciality);
  const form = useForm<z.infer<typeof projectInsertSchema>>({
    defaultValues: {
      title: data.title,
      specialty: data.speciality.replace(" ", "_") as z.infer<
        typeof projectInsertSchema
      >["specialty"],
      description: data.description,
      category: data.category,
    },
  });
  const specialties = Object.values(Specialty);
  // form submission
  const onSubmit = async (payload: z.infer<typeof projectInsertSchema>) => {
    console.log(payload);
    const response = honoClient.api.teachers.projects[":id"].$patch({
      param: {
        id: data.id,
      },
      json: payload,
    });
    console.log((await response).json());
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field}></Input>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field}></Textarea>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speciality</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a speciality"></SelectValue>
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
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter a category" {...field}></Input>
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" size="sm" className="float-right">
          Edit
        </Button>
      </form>
    </Form>
  );
}

export { EditProjectForm };
