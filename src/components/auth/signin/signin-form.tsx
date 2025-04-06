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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SignInFormValues = {
  email: string;
  password: string;
};

const defaultValues: SignInFormValues = {
  email: "",
  password: "",
};

function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    defaultValues,
  });

  async function onSubmit(values: SignInFormValues) {
    const { data, error } = await authClient.signIn.email(values);
    if (error) {
      toast.error(getAuthErrorMessage(error.code!, "en"));
      return;
    }

    console.log(data);

    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@univ-msila.dz"
                  {...field}
                  required
                />
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
                  placeholder="●●●●●●●●"
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
