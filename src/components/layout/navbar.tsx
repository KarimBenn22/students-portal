"use client";

import { authClient } from "@/client/auth.client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

const studentRoutes = [
  { href: "/student", label: "لوحة التحكم" },
  { href: "/student/projects", label: "المشاريع" },
  { href: "/student/applications", label: "طلباتي" },
  { href: "/student/profile", label: "الملف الشخصي" },
];

const teacherRoutes = [
  { href: "/teacher", label: "لوحة التحكم" },
  { href: "/teacher/projects", label: "المشاريع" },
  { href: "/teacher/applications", label: "الطلبات" },
];

export function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const routes =
    session?.user.role === "teacher" ? teacherRoutes : studentRoutes;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  return (
    <div className="border-b" dir="rtl">
      <div className="flex h-16 items-center justify-between px-4 container max-w-7xl mx-auto">
        <div className="font-semibold text-lg hidden md:block">
          بوابة المشاريع
        </div>

        <NavigationMenu>
          <NavigationMenuList className="gap-1 md:gap-6">
            {routes.map((route) => (
              <NavigationMenuItem key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    pathname === route.href
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {route.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">{session?.user.name}</p>
            <p className="text-xs text-muted-foreground">
              {session?.user.role === "teacher" ? "أستاذ" : "طالب"}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full ring-2 ring-muted hover:ring-ring hover:bg-accent"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(session?.user.name || "مستخدم")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session?.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={
                    session?.user.role === "teacher"
                      ? "/teacher/settings"
                      : "/student/profile"
                  }
                  className="w-full cursor-pointer focus:bg-accent"
                >
                  <User className="ml-2 h-4 w-4" />
                  <span>الملف الشخصي</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer focus:bg-accent text-red-500 focus:text-red-500"
                onClick={handleSignOut}
              >
                <LogOut className="ml-2 h-4 w-4" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
