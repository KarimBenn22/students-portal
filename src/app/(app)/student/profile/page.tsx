"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { authClient, getAuthErrorMessage } from "@/client/auth.client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Specialty } from "@prisma/client";

const userInfoSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  registerationNumber: z.string().min(1, "رقم التسجيل مطلوب"),
  specialty: z.nativeEnum(Specialty, {
    errorMap: () => ({ message: "التخصص مطلوب" }),
  }),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword: z
      .string()
      .min(6, "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type UserInfoFormData = z.infer<typeof userInfoSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function StudentProfile() {
  const { data: session, isPending } = authClient.useSession();
  const isLoading = isPending;
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const userInfoForm = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: session?.user.name || "",
      registerationNumber: session?.user.registerationNumber || "",
      specialty: session?.user.specialty as Specialty || undefined,
    },
  });

  // Remove the useEffect reset since we're handling defaults properly
  useEffect(() => {
    if (session?.user) {
      userInfoForm.setValue("name", session.user.name || "");
      userInfoForm.setValue("registerationNumber", session.user.registerationNumber || "");
      userInfoForm.setValue("specialty", session.user.specialty as Specialty);
    }
  }, [session, userInfoForm]);

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onUserInfoSubmit = async (data: UserInfoFormData) => {
    if (isInfoLoading) return;
    try {
      setIsInfoLoading(true);
      const { error } = await authClient.updateUser({
        name: data.name,
        registerationNumber: data.registerationNumber,
        specialty: data.specialty,
      });

      if (error) {
        toast(getAuthErrorMessage(error.code!, "ar"));
        return;
      }
      toast("تم تحديث المعلومات بنجاح");
      userInfoForm.reset();
    } catch (error) {
      toast("حدث خطأ أثناء تحديث المعلومات");
    } finally {
      setIsInfoLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (isPasswordLoading) return;
    try {
      setIsPasswordLoading(true);
      const { error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (error) {
        toast(getAuthErrorMessage(error.code!, "ar"));
        return;
      }
      toast("تم تحديث كلمة المرور بنجاح");
      passwordForm.reset();
    } catch (error) {
      toast("حدث خطأ أثناء تحديث كلمة المرور");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="الملف الشخصي"
        description="إدارة إعدادات حسابك"
      />
      <PageWrapper.Content>
        <div className="space-y-6 w-full max-w-2xl mx-auto" dir="rtl">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>المعلومات الشخصية</CardTitle>
              <CardDescription>تحديث معلومات حسابك</CardDescription>
            </CardHeader>
            <Form {...userInfoForm}>
              <form onSubmit={userInfoForm.handleSubmit(onUserInfoSubmit)}>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <>
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </>
                  ) : (
                    <>
                      <FormField
                        control={userInfoForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الاسم</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={userInfoForm.control}
                        name="registerationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رقم التسجيل</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={userInfoForm.control}
                        name="specialty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>التخصص</FormLabel>
                            <Select
                              defaultValue={session?.user.specialty}
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isLoading}
                            >
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
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    loading={isInfoLoading}
                    disabled={isLoading}
                    className="mt-4"
                  >
                    تحديث المعلومات
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>كلمة المرور</CardTitle>
              <CardDescription>تغيير كلمة المرور الخاصة بك</CardDescription>
            </CardHeader>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>كلمة المرور الحالية</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>كلمة المرور الجديدة</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تأكيد كلمة المرور</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" loading={isPasswordLoading} className="mt-4">
                    تحديث كلمة المرور
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
