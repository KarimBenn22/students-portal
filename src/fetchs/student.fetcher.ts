import { honoClient } from "@/client/hono.client";
import { InferRequest } from "better-auth";
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
export type Projects = InferResponseType<typeof studentProjectRoute.$get, 200>;
export async function getStudentProjects(headers?: Record<any, any>) {
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
  projectId: InferRequestType<
    typeof studentProjectProposalRoute.$post
  >["param"]["projectId"],
  headers?: Record<string, string>
) {
  const res = await studentProjectProposalRoute.$post(
    {
      param: {
        projectId,
      },
    },
    { headers }
  );
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
