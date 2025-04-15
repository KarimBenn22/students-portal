"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function StudentProfile() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock student profile data
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.j@university.edu",
    regNumber: "AJ2023",
    department: "Computer Science",
    year: "3rd Year",
    bio: "I'm a computer science student with interests in AI, web development, and blockchain technology.",
    skills: "JavaScript, React, Python, Machine Learning",
    interests: "Artificial Intelligence, Web Development, Blockchain",
  })

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const formData = new FormData(e.currentTarget)

      const updatedProfile = {
        ...profile,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        regNumber: formData.get("regNumber") as string,
        department: formData.get("department") as string,
        year: formData.get("year") as string,
        bio: formData.get("bio") as string,
        skills: formData.get("skills") as string,
        interests: formData.get("interests") as string,
      }

      setProfile(updatedProfile)
      setIsLoading(false)

      toast("Your profile has been updated successfully")
    }, 1000)
  }

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Profile"
        description="Manage your personal information and preferences"
      />
      <PageWrapper.Content>
        <div className="space-y-6 w-full">
          <form onSubmit={handleProfileUpdate}>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" defaultValue={profile.name} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" defaultValue={profile.email} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regNumber">Registration Number</Label>
                      <Input id="regNumber" name="regNumber" defaultValue={profile.regNumber} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" name="department" defaultValue={profile.department} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year of Study</Label>
                      <Input id="year" name="year" defaultValue={profile.year} required />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" rows={4} defaultValue={profile.bio} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Textarea id="skills" name="skills" rows={2} defaultValue={profile.skills} />
                    <p className="text-xs text-muted-foreground">Separate skills with commas</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <Textarea id="interests" name="interests" rows={2} defaultValue={profile.interests} />
                    <p className="text-xs text-muted-foreground">Separate interests with commas</p>
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
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" name="currentPassword" type="password" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" name="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" name="confirmPassword" type="password" />
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
  )
}
