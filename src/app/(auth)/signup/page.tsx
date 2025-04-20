import { SignUpForm } from "@/components/auth/signup/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Card className="shadow-none border-0 w-full bg-transparent" dir="rtl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">إنشاء حساب</CardTitle>
        <CardDescription className="text-center">
          أدخل بياناتك لإنشاء حساب جديد
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          لديك حساب بالفعل؟{" "}
          <Link href="/signin" className="text-primary hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
