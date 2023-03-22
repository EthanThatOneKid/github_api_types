import { Project } from "./deps.ts";
import { MODULES } from "./data.ts";
import { buildModules } from "./types_builder/module_decls.ts";

if (import.meta.main) {
  const project = new Project({ useInMemoryFileSystem: true });
  buildModules(project, MODULES);
}
