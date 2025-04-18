import { honoClient } from "@/client/hono.client";
import { InferRequestType, InferResponseType } from "hono";

const teacherProjectsRoute = honoClient.api.teachers.projects;
const teacherProjectRoute = honoClient.api.teachers.projects[":id"];

export type TeacherProject = InferResponseType<
  typeof teacherProjectsRoute.$get,
  200
>[number];
export async function getTeacherProjects(
  input: InferRequestType<typeof teacherProjectsRoute.$get>,
  headers?: Record<string, string>
) {
  const res = await teacherProjectsRoute.$get(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return data;
}

export async function createTeacherProject(
  input: InferRequestType<typeof teacherProjectsRoute.$post>,
  headers?: Record<string, string>
) {
  const res = await teacherProjectsRoute.$post(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateTeacherProject(
  input: InferRequestType<typeof teacherProjectRoute.$patch>,
  headers?: Record<string, string>
) {
  const res = await teacherProjectRoute.$patch(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteTeacherProject(
  input: InferRequestType<typeof teacherProjectRoute.$delete>,
  headers?: Record<string, string>
) {
  const res = await teacherProjectRoute.$delete(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
