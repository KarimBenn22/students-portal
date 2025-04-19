"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectCard } from "./project-card";
import { TeacherProject } from "@/fetchs/teacher.fetcher";
import { InferResponseType } from "hono/client";
import { honoClient } from "@/client/hono.client";

function ProjectsList({
  initialProjects,
}: {
  initialProjects: TeacherProject[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
          <Input
            placeholder="البحث عن مشاريع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed bg-white/50">
          <div className="text-center">
            <h3 className="text-lg font-medium">لا توجد اية مشاريع</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              حاول تغيير عنوان البحث او قم بانشاء مشاريع
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export { ProjectsList };
