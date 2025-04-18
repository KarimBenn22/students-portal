"use client";

import type React from "react";
import { useState } from "react";
import { ProjectCard } from "@/components/student/project-card";
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
import { Search } from "lucide-react";
import { createStudentProposal, Projects } from "@/fetchs/student.fetcher";
import { Button } from "@/components/ui/button";
import tryCatch from "@/helpers/trycatch";
import { useRouter } from "next/navigation";





interface ProjectsClientProps {
  initialProjects: Projects[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  // Filter projects based on search query
  const filteredProjects = initialProjects.filter(
    (project) =>
      project.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  const handleApply = (project: Projects) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleSubmitApplication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const proposal = formData.get("proposal") as string;

    if (!selectedProject) return;
    const {data, error} = await tryCatch(createStudentProposal(selectedProject.id));
    if(error){
      toast(error.message);
      setIsDialogOpen(false);
      return;
    }
    router.push("/student/applications");
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
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onApply={handleApply}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center">
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
