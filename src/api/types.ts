import { Session, User } from "better-auth";
import { Hono } from "hono";
import { Env, Schema } from "hono/types";

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

export type BaseRoute<
  T extends BaseApiBindings,
  U extends Schema,
  E extends string
> = (api: Hono<T, U, E>) => Hono<T, U, E>;
