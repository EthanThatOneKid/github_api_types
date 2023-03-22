import type {
  JSDocTagStructure,
  OpenAPIObject,
  OperationObject,
  PathItemObject,
  Project,
} from "../deps.ts";
import { pascalCase, SourceFile } from "../deps.ts";
import { buildPathnameParams } from "./pathname_params_decls.ts";

export function buildModules(
  project: Project,
  modules: Record<string, OpenAPIObject>,
): void {
  for (const [filename, oaObject] of Object.entries(modules)) {
    const fileDecl = project.createSourceFile(filename);
    buildModule(fileDecl, oaObject);
  }
}

function buildModule(
  fileDecl: SourceFile,
  oaObject: OpenAPIObject,
): void {
  for (
    const [pathname, pathItem] of Object.entries<PathItemObject>(oaObject.paths)
  ) {
    const { identifier, pathnameParams } = parsePathname(pathname);
    if (pathnameParams.length > 0) {
      buildPathnameParams(fileDecl, identifier, pathnameParams, pathItem);
      return;
    }

    // TODO:
    // makeSearchParamsDecls(fileDecl, pathname, pathItem);
    // makeRequestBodyDecls(fileDecl, pathname, pathItem);
    // makeResponseDecls(fileDecl, pathname, pathItem);
  }
}

interface ParsedPathname {
  identifier: string;
  pathnameParams: string[];
}

function parsePathname(path: string): ParsedPathname {
  const pathnameParams: string[] = [];
  const identifier = pascalCase(
    path.replace(
      /\{.*?\}/g,
      (match) => {
        const param = match.replace(/[{}]/g, "");
        pathnameParams.push(param);
        return "";
      },
    ),
  ) || "Root";
  return { identifier, pathnameParams };
}
