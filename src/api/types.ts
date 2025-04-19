import { Env } from "hono/types";
import { auth } from "./auth/index.auth";

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;

export interface BaseApiBindings extends Env {
  Variables: {
    session: {
      user: User;
      session: Session;
    } | null;
  };
}

export interface TeacherApiBindings extends BaseApiBindings {
  Variables: {
    session: {
      user: User;
      session: Session;
    };
  };
}

export interface StudentApiBindings extends BaseApiBindings {
  Variables: {
    session: {
      user: User;
      session: Session;
    };
  };
}
