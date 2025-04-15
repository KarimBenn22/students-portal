"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PageWrapper } from "@/components/layout/page-wrapper";

export default function TeacherSettings() {
  const [isLoading, setIsLoading] = useState(false);

  // Mock teacher profile data
  const [profile, setProfile] = useState({
    name: "Dr. Emily Johnson",
    email: "emily.j@university.edu",
    department: "Computer Science",
    position: "Associate Professor",
    bio: "Associate Professor of Computer Science with a focus on Artificial Intelligence and Machine Learning. I have 10+ years of experience in academic research and industry collaborations.",
    researchInterests:
      "Artificial Intelligence, Machine Learning, Natural Language Processing",
    officeHours: "Monday and Wednesday, 2-4 PM",
    notifications: {
      email: true,
      applications: true,
      updates: false,
    },
  });

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const formData = new FormData(e.currentTarget);

      const updatedProfile = {
        ...profile,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        department: formData.get("department") as string,
        position: formData.get("position") as string,
        bio: formData.get("bio") as string,
        researchInterests: formData.get("researchInterests") as string,
        officeHours: formData.get("officeHours") as string,
      };

      setProfile(updatedProfile);
      setIsLoading(false);

      toast("Your profile has been updated successfully.");
    }, 1000);
  };

  const toggleNotification = (key: string) => {
    setProfile({
      ...profile,
      notifications: {
        ...profile.notifications,
        [key]:
          !profile.notifications[key as keyof typeof profile.notifications],
      },
    });
  };

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Settings"
        description="Manage your account settings and preferences"
      />
      <PageWrapper.Content>
        <div className="space-y-6">
          <form onSubmit={handleProfileUpdate}>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile details visible to students
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={profile.name}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={profile.email}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        name="department"
                        defaultValue={profile.department}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        name="position"
                        defaultValue={profile.position}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      defaultValue={profile.bio}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="researchInterests">
                      Research Interests
                    </Label>
                    <Textarea
                      id="researchInterests"
                      name="researchInterests"
                      rows={2}
                      defaultValue={profile.researchInterests}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate research interests with commas
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="officeHours">Office Hours</Label>
                    <Input
                      id="officeHours"
                      name="officeHours"
                      defaultValue={profile.officeHours}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about important updates
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={profile.notifications.email}
                      onCheckedChange={() => toggleNotification("email")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="application-notifications">
                        Application Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when students apply to your projects
                      </p>
                    </div>
                    <Switch
                      id="application-notifications"
                      checked={profile.notifications.applications}
                      onCheckedChange={() => toggleNotification("applications")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="update-notifications">
                        System Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about system updates and new
                        features
                      </p>
                    </div>
                    <Switch
                      id="update-notifications"
                      checked={profile.notifications.updates}
                      onCheckedChange={() => toggleNotification("updates")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" type="button">
                    Change Password
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
