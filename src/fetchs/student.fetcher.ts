import { honoClient } from "@/client/hono.client";
import { InferRequestType } from "hono";

// Projects routes
const studentProjectsRoute = honoClient.api.students.projects;
const studentProjectRoute = honoClient.api.students.projects[":id"];

// Proposals routes
const studentProposalsRoute = honoClient.api.students.proposals;
const studentProposalRoute = honoClient.api.students.proposals[":id"];
const studentProjectProposalRoute =
  honoClient.api.students.proposals[":projectId"];

// Projects APIs
export async function getStudentProjects(
  input: InferRequestType<typeof studentProjectsRoute>,
  headers?: Record<string, string>
) {
  const res = await studentProjectsRoute.$get(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return data;
}

export async function getStudentProject(
  input: InferRequestType<typeof studentProjectRoute>,
  headers?: Record<string, string>
) {
  const res = await studentProjectRoute.$get(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return data;
}

// Proposals APIs
export async function getStudentProposals(
  input: Record<string, never> = {},
  headers?: Record<string, string>
) {
  const res = await studentProposalsRoute.$get(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return data;
}

export async function createStudentProposal(
  input: InferRequestType<typeof studentProjectProposalRoute>,
  headers?: Record<string, string>
) {
  const res = await studentProjectProposalRoute.$post(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteStudentProposal(
  input: InferRequestType<typeof studentProposalRoute>,
  headers?: Record<string, string>
) {
  const res = await studentProposalRoute.$delete(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
