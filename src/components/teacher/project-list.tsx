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
import { useState } from "react";
import { ProjectCard, type ProjectCardProps as Project } from "./project-card";

// Generate random pastel colors for categories
const categoryColors: Record<string, string> = {
  web: "bg-blue-100 text-blue-800",
  mobile: "bg-green-100 text-green-800",
  desktop: "bg-purple-100 text-purple-800",
  ai: "bg-red-100 text-red-800",
  iot: "bg-amber-100 text-amber-800",
  vr: "bg-indigo-100 text-indigo-800",
  "3d": "bg-pink-100 text-pink-800",
};

function ProjectsList({ initialProjects }: { initialProjects: Project[] }) {
  const [projects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel =
      levelFilter === "all" || project.speciality === levelFilter;
    const matchesCategory =
      categoryFilter === "all" || project.category.includes(categoryFilter);

    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="space-y-6 w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
          <Input
            placeholder="Search projects..."
            className="h-10 border-none bg-white pl-9 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[120px] border-none bg-white shadow-sm">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="L3">L3</SelectItem>
              <SelectItem value="M2">M2</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px] border-none bg-white shadow-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="ai">AI</SelectItem>
              <SelectItem value="iot">IoT</SelectItem>
              <SelectItem value="vr">VR</SelectItem>
              <SelectItem value="3d">3D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed bg-white/50">
          <div className="text-center">
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </div>
  );
}

export { ProjectsList };
