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
import { PageWrapper } from "@/components/layout/page-wrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Search } from "lucide-react";

// Mock data for projects
const allProjects = [
  {
    id: "1",
    title: "AI-Powered Learning Assistant",
    description:
      "Develop an AI assistant that helps students learn by providing personalized feedback and resources.",
    category: "Artificial Intelligence",
    teacher: "Dr. Emily Johnson",
    maxStudents: 4,
  },
  {
    id: "2",
    title: "Blockchain for Academic Records",
    description:
      "Create a blockchain-based system for securely storing and verifying academic credentials.",
    category: "Blockchain",
    teacher: "Dr. Michael Smith",
    maxStudents: 3,
  },
  {
    id: "3",
    title: "VR Chemistry Lab",
    description:
      "Build a virtual reality chemistry lab that allows students to conduct experiments safely.",
    category: "Virtual Reality",
    teacher: "Prof. Robert Chen",
    maxStudents: 5,
  },
  {
    id: "4",
    title: "Sustainable Campus IoT Network",
    description:
      "Design and implement an IoT network to monitor and optimize energy usage across campus.",
    category: "Internet of Things",
    teacher: "Prof. Sarah Williams",
    maxStudents: 4,
  },
  {
    id: "5",
    title: "Machine Learning for Climate Data",
    description:
      "Apply machine learning techniques to analyze climate data and predict environmental changes.",
    category: "Machine Learning",
    teacher: "Dr. James Wilson",
    maxStudents: 3,
  },
  {
    id: "6",
    title: "Mobile Health Monitoring App",
    description:
      "Develop a mobile application that tracks health metrics and provides insights for users.",
    category: "Mobile Development",
    teacher: "Dr. Lisa Brown",
    maxStudents: 4,
  },
];

// Mock data for student's applications
const studentApplications = [
  {
    projectId: "1",
    status: "pending",
  },
  {
    projectId: "3",
    status: "accepted",
  },
];

export default function StudentProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { name: "", email: "", regNumber: "" },
  ]);

  // Filter projects based on search query
  const filteredProjects = allProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (project: any) => {
    setSelectedProject(project);
    setTeamMembers([{ name: "", email: "", regNumber: "" }]);
    setIsDialogOpen(true);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", email: "", regNumber: "" }]);
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
  };

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      const updatedMembers = [...teamMembers];
      updatedMembers.splice(index, 1);
      setTeamMembers(updatedMembers);
    }
  };

  const handleSubmitApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // In a real app, this would submit the application to an API
    toast(
      `Your application for "${selectedProject.title}" has been submitted successfully.`
    );
    setIsDialogOpen(false);
  };

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="Browse Projects"
        description="Explore available projects and apply to up to 3"
      />
      <PageWrapper.Content>
        <div className="space-y-6 w-full">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects by title, description, category or teacher..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const applied = false; //hasApplied(project.id)
              const application = studentApplications.find(
                (app) => app.projectId === project.id
              );

              return (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm">{project.description}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Teacher:</span>
                        <span>{project.teacher}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Team Size:
                        </span>
                        <span>Up to {project.maxStudents} students</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {applied ? (
                      <Button variant="outline" className="w-full" disabled>
                        {application?.status === "accepted"
                          ? "Application Accepted"
                          : "Application Pending"}
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => handleApply(project)}
                        disabled={false} // hasReachedMaxApplications}
                      >
                        {false
                          ? "Max Applications Reached"
                          : "Apply to Project"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search query
              </p>
            </div>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Apply to Project</DialogTitle>
                <DialogDescription>{selectedProject?.title}</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmitApplication}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="proposal">Your Proposal</Label>
                    <Textarea
                      id="proposal"
                      name="proposal"
                      rows={4}
                      placeholder="Describe your ideas for this project and why you're interested..."
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Team Members</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addTeamMember}
                        disabled={
                          teamMembers.length >=
                          (selectedProject?.maxStudents - 1 || 3)
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Member
                      </Button>
                    </div>

                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="space-y-2 p-3 border rounded-md"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor={`name-${index}`}>Name</Label>
                            <Input
                              id={`name-${index}`}
                              value={member.name}
                              onChange={(e) =>
                                updateTeamMember(index, "name", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor={`email-${index}`}>Email</Label>
                            <Input
                              id={`email-${index}`}
                              type="email"
                              value={member.email}
                              onChange={(e) =>
                                updateTeamMember(index, "email", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label htmlFor={`regNumber-${index}`}>
                              Registration Number
                            </Label>
                            <Input
                              id={`regNumber-${index}`}
                              value={member.regNumber}
                              onChange={(e) =>
                                updateTeamMember(
                                  index,
                                  "regNumber",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          {teamMembers.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeTeamMember(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit">Submit Application</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
