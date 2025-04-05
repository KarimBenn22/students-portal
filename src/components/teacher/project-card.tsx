export type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  speciality: string;
  category: string[];
  createdAt: Date;
};
function ProjectCard({
  title,
  description,
  speciality,
  category,
  createdAt,
}: ProjectCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:border-gray-300">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
          {speciality}
        </span>
        <span className="text-sm text-gray-500">
          {createdAt.toLocaleDateString()}
        </span>
      </div>

      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
          {category}
        </span>
      </div>
    </div>
  );
}

export { ProjectCard };
