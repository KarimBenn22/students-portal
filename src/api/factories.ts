import { createFactory } from "hono/factory";
import type {
  BaseApiBindings,
  TeacherApiBindings,
  StudentApiBindings,
} from "./types";

const factories = {
  base: createFactory<BaseApiBindings>(),
  teacher: createFactory<TeacherApiBindings>(),
  student: createFactory<StudentApiBindings>(),
};

export default factories;
