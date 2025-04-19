"use client";

import { StudentProject } from "@/fetchs/student.fetcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: StudentProject;
  onApply: (project: StudentProject) => void;
}

export function ProjectCard({ project, onApply }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full bg-card" dir="rtl">
      <CardHeader className="space-y-2">
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold tracking-tight text-right">
            {project.title}
          </CardTitle>
          <div className="flex flex-wrap gap-2 justify-end">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {project.category}
            </Badge>
            {project.specialty && (
              <Badge variant="secondary" className="bg-muted/50">
                {project.specialty}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 text-right">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-4 border-t">
        <div className="flex justify-between items-center w-full text-sm" dir="rtl">
          <span className="text-muted-foreground">الأستاذ</span>
          <span className="font-medium">{project.author}</span>
        </div>
        <Button
          className="w-full transition-all shadow-sm"
          variant={"secondary"}
          size="sm"
          onClick={() => onApply(project)}
        >
          التقديم على المشروع
        </Button>
      </CardFooter>
    </Card>
  );
}
