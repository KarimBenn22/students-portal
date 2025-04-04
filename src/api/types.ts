import { Session, User } from "better-auth";
import { Env } from "hono/types";

export interface BaseApiBindings extends Env {
  Variables: {
    session: {
      user: User;
      session: Session;
    } | null;
  };
}

export interface TeacherApiBindings extends BaseApiBindings {}
