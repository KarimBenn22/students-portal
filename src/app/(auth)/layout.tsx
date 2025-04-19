import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
      dir="rtl"
    >
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900 bg-[url('/uni-background.png')] bg-cover bg-center bg-no-repeat" />
      </div>
      <div className="lg:p-8 w-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[400px] items-center">
          <Button asChild variant="ghost" className="w-fit mx-auto mb-4">
            <Link href="/signin">
              <Image src="/uni-logo.png" alt="University Logo" width={60} height={60} />
            </Link>
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
}
