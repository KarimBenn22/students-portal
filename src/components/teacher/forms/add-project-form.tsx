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

function AddProjectForm() {
  const form = useForm<z.infer<typeof projectInsertSchema>>({
    defaultValues: {
      category: "",
      title: "",
      specialty: "L3_SI",
      description: "",
    },
  });
  const specialties = Object.values(Specialty);
  const onSubmit = (payload: z.infer<typeof projectInsertSchema>) => {
    console.log(payload);
    console.log(Object.values(specialties));
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
                <Input placeholder="Enter project title"></Input>
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
          Create
        </Button>
      </form>
    </Form>
  );
}

export { AddProjectForm };
