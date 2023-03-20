import { Project } from "./deps.ts";
import { makeModules } from "./oa2ts.ts";
import { MODULES } from "./data.ts";

if (import.meta.main) {
  const project = new Project({ useInMemoryFileSystem: true });
  makeModules(project, MODULES);
}
