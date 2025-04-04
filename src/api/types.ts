import type { Teacher, Session } from "@prisma/client";
import { Env } from "hono/types";

export interface BaseApiBindings extends Env {
  Variables: object;
}

export interface TeacherSession extends Omit<Session, "userId"> {
  teacher: Teacher;
}

export interface TeacherApiBindings extends BaseApiBindings {
  Variables: {
    session: TeacherSession;
  };
}
