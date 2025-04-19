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
import {
  createStudentProposal,
  type StudentProject,
} from "@/fetchs/student.fetcher";
import { Button } from "@/components/ui/button";
import tryCatch from "@/helpers/trycatch";
import { useRouter } from "next/navigation";

interface ProjectsClientProps {
  initialProjects: StudentProject[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const filteredProjects = initialProjects.filter(
    (project) =>
      project.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = async (project: StudentProject) => {
    setSelectedProject(project);
    if (!project) return;
    const { data, error } = await tryCatch(
      createStudentProposal({
        param: {
          projectId: project.id,
        },
      })
    );
    if (error) {
      toast(error.message);
      setIsDialogOpen(false);
      return;
    }
    router.push("/student/applications");
  };

  return (
    <PageWrapper>
      <PageWrapper.Header
        title="تصفح المشاريع"
        description="استعرض المشاريع المتاحة وتقدم إلى 3 كحد أقصى"
      />
      <PageWrapper.Content>
        <div className="space-y-6 w-full">
          <div className="flex items-center space-x-2" dir="rtl">
            <div className="relative flex-1">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن مشروع حسب العنوان أو الوصف أو الفئة أو الأستاذ..."
                className="pr-8 text-right"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" dir="rtl">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onApply={handleApply}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center" dir="rtl">
              <h3 className="text-lg font-medium">لا توجد مشاريع</h3>
              <p className="text-muted-foreground">
                جرّب تغيير عبارة البحث
              </p>
            </div>
          )}
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  );
}
