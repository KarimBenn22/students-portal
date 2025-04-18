"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authClient, getAuthErrorMessage } from "@/client/auth.client";
import {
  displayNameSchema,
  passwordUpdateSchema,
} from "@/lib/schemas/profile.schema";
import type {
  DisplayNameFormData,
  PasswordUpdateFormData,
} from "@/lib/schemas/profile.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentProfile() {
  const [isNameLoading, setIsNameLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const displayNameForm = useForm<DisplayNameFormData>({
    resolver: zodResolver(displayNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const passwordForm = useForm<PasswordUpdateFormData>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onDisplayNameSubmit = async (data: DisplayNameFormData) => {
    if (isNameLoading) return;
    try {
      setIsNameLoading(true);
      const { data: response, error } = await authClient.updateUser({
        name: data.name,
      });
      if (error) {
        toast.error(getAuthErrorMessage(error.code!, "en"));
        return;
      }
      toast.success("Display name updated successfully");
      displayNameForm.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update display name"
      );
    } finally {
      setIsNameLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordUpdateFormData) => {
    if (isPasswordLoading) return;
    try {
      setIsPasswordLoading(true);
      const { data: response, error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (error) {
        toast.error(getAuthErrorMessage(error.code!, "en"));
        return;
      }
      toast.success("Password updated successfully");
      passwordForm.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update password"
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Profile"
        description="Manage your account settings"
      />
      <PageWrapper.Content>
        <div className="space-y-6 w-full max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Display Name</CardTitle>
              <CardDescription>
                Change how your name appears to others
              </CardDescription>
            </CardHeader>
            <Form {...displayNameForm}>
              <form
                onSubmit={displayNameForm.handleSubmit(onDisplayNameSubmit)}
              >
                <CardContent>
                  {isNameLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : (
                    <FormField
                      control={displayNameForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isNameLoading}>
                    {isNameLoading ? "Updating..." : "Update Name"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your account password</CardDescription>
            </CardHeader>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                <CardContent className="space-y-4">
                  {isPasswordLoading ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[140px]" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
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
                            <FormLabel>New Password</FormLabel>
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
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isPasswordLoading}>
                    {isPasswordLoading ? "Updating..." : "Update Password"}
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
