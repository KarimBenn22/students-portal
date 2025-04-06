import { createFactory } from "hono/factory";
import type { BaseApiBindings, TeacherApiBindings } from "./types";

const factories = {
  base: createFactory<BaseApiBindings>(),
  teacher: createFactory<TeacherApiBindings>(),
};

export default factories;
