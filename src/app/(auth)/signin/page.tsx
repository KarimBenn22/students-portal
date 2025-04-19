import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/components/auth/signin/signin-form";

export default function SignInPage() {
  return (
    <Card className="shadow-none border-0 w-full bg-transparent" dir="rtl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
        <CardDescription className="text-center">
          أدخل بيانات الاعتماد للوصول إلى حسابك
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <SignInForm />
      </CardContent>
    </Card>
  );
}
