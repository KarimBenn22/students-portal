"use client";
import { getAuthErrorMessage, authClient } from "@/client/auth.client";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Specialty } from "@prisma/client";

const signUpSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  registerationNumber: z.string().min(1, "رقم التسجيل مطلوب"),
  specialty: z.nativeEnum(Specialty, {
    errorMap: () => ({ message: "التخصص مطلوب" }),
  }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const defaultValues: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
  registerationNumber: "",
  specialty: undefined as unknown as Specialty,
};

function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  async function onSubmit(values: SignUpFormValues) {
    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      ...values,
      role: "student",
    });

    if (error) {
      toast.error(getAuthErrorMessage(error.code!, "ar"));
      setLoading(false);
      return;
    }

    toast.success("تم إنشاء الحساب بنجاح");
    router.push("/signin");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
        dir="rtl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input placeholder="الاسم الكامل" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input placeholder="example@univ-msila.dz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" placeholder="●●●●●●●●" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registerationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم التسجيل</FormLabel>
              <FormControl>
                <Input placeholder="رقم التسجيل" {...field} />
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Specialty).map((specialty) => (
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
        <Button type="submit" className="w-full" size="sm" loading={loading}>
          إنشاء حساب
        </Button>
      </form>
    </Form>
  );
}

export { SignUpForm };