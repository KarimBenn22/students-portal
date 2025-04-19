import { honoClient } from "@/client/hono.client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { AddEditProjectModal } from "./modals/add-project.modal";
import { TeacherProject } from "@/fetchs/teacher.fetcher";
import { Badge } from "../ui/badge";
import { InferResponseType } from "hono/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function ProjectCard({ project }: { project: TeacherProject }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="overflow-hidden rounded-sm border bg-white p-6 transition-all space-y-2">
      <AddEditProjectModal
        mode="edit"
        data={project}
        isOpen={open}
        setIsOpen={(value: boolean) => setOpen(value)}
      />
      <div className="flex items-center justify-between">
        <Badge className="rounded-full text-sm" variant={"default"}>
          {project.specialty}
        </Badge>
        <ProjectMenu projectId={project.id} openModal={() => setOpen(true)} />
      </div>

      <div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">
          {project.title}
        </h3>
        <p className="mb-4 text-gray-600">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-between">
        <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600">
          {project.category}
        </span>
        <span className="text-sm text-gray-500">{project.createdAt}</span>
      </div>
    </div>
  );
}



function ProjectMenu({
  projectId,
  openModal,
}: {
  projectId: string;
  openModal: () => void;
}) {
  const router = useRouter();
  const removeProject = async (projectId: string) => {
    const response = await honoClient.api.teachers.projects[":id"].$delete({
      param: {
        id: projectId,
      },
    });
    if (response.ok) {
      router.refresh();
      toast.success("تم حذف المشروع بنجاح");
    }
    else {
      toast.error("حدثت مشكلة اثناء حذف المشروع")
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent dir="rtl" className="text-right">
        <DropdownMenuLabel>إجراءات المشروع</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={openModal}>تعديل</DropdownMenuItem>
        <DropdownMenuItem onClick={async () => await removeProject(projectId)}>
          حذف
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProjectCard };
