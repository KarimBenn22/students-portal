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
import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";

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

  return (
    <div className="border-b" dir="rtl">
      <div className="flex h-16 items-center px-4 container">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            {routes.map((route) => (
              <NavigationMenuItem key={route.href}>
                <Link
                  href={route.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === route.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                >
                  {route.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="mr-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
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
                  className="w-full cursor-pointer"
                >
                  <User className="ml-2 h-4 w-4" />
                  <span>الملف الشخصي</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => authClient.signOut()}
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
