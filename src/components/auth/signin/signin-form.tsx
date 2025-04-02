"use client";
import { signIn } from "@/actions/actions";
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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { tryCatch, handleValidationError, isApiError } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

type SignInFormValues = {
  username: string;
  password: string;
};

const defaultValues: SignInFormValues = {
  username: "",
  password: "",
};

function SignInForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string>("");
  const form = useForm<SignInFormValues>({
    defaultValues,
  });

  const onSubmit = async (payload: SignInFormValues) => {
    setApiError("");
    const { data, error } = await tryCatch(signIn(payload));

    if (error) {
      toast.error("An unexpected error occurred");
      return;
    }

    if (!data.success) {
      const hasValidationError = handleValidationError(data, form.setError);
      if (hasValidationError) return;

      if (isApiError(data.error)) {
        switch (data.error.code) {
          case "already_authenticated":
            router.push("/");
            return;
          case "invalid_credentials":
            setApiError("Invalid username or password");
            return;
          default:
            toast.error("An unexpected error occurred");
            return;
        }
      }

      toast.error("An unexpected error occurred");
      return;
    }

    toast.success("Signed in successfully!");
    router.push("/dashboard");
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} required />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}

export { SignInForm };
