import { honoClient } from "@/client/hono.client";
import { InferRequestType, InferResponseType } from "hono";

// Projects routes
const studentProjectsRoute = honoClient.api.students.projects;
const studentProjectRoute = honoClient.api.students.projects[":id"];

// Proposals routes
const studentProposalsRoute = honoClient.api.students.proposals;
const studentProposalRoute = honoClient.api.students.proposals[":id"];
const studentProjectProposalRoute =
  honoClient.api.students.proposals[":projectId"];

// Projects APIs
export type StudentProject = InferResponseType<
  typeof studentProjectRoute.$get,
  200
>;
export async function getStudentProjects(headers?: Record<string, string>) {
  const res = await studentProjectsRoute.$get(
    { query: {} },
    {
      headers: headers,
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return data;
}

export async function getStudentProject(
  input: InferRequestType<typeof studentProjectRoute.$get>,
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
export type StudentProposal = InferResponseType<
  typeof studentProposalsRoute.$get,
  200
>;
export async function getStudentProposals(
  input: InferRequestType<typeof studentProposalsRoute.$get>,
  headers?: Record<string, string>
) {
  const res = await studentProposalsRoute.$get(input, {
    headers: headers,
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return data;
}

export async function createStudentProposal(
  input: InferRequestType<typeof studentProjectProposalRoute.$post>,
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
  input: InferRequestType<typeof studentProposalRoute.$delete>,
  headers?: Record<string, string>
) {
  const res = await studentProposalRoute.$delete(input, { headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
