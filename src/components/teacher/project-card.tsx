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

export type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  speciality: string;
  category: string[];
  createdAt: Date;
};
function ProjectCard({
  id,
  title,
  description,
  speciality,
  category,
  createdAt,
}: ProjectCardProps) {
  console.log(id);
  return (
    <div className="overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:border-gray-300 space-y-2">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
          {speciality}
        </span>
        <ProjectMenu projectId={id}></ProjectMenu>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
        <p className="mb-4 text-gray-600">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-between">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
          {category}
        </span>
        <span className="text-sm text-gray-500">
          {createdAt.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

const removeProject = async (projectId: string) => {
  const response = await honoClient.api.teachers.projects[":id"].$delete({
    param: {
      id: projectId,
    },
  });
  console.log(response);
  return response;
};

function ProjectMenu({ projectId }: { projectId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis></Ellipsis>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={async () => await removeProject(projectId)}>
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export { ProjectCard };
