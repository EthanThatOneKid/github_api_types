import type {
  JSDocTagStructure,
  OpenAPIObject,
  OperationObject,
  PathItemObject,
  Project,
} from "./deps.ts";
import { pascalCase, SourceFile } from "./deps.ts";

export function makeModules(
  project: Project,
  modules: Record<string, OpenAPIObject>,
): void {
  for (const [filename, oaObject] of Object.entries(modules)) {
    const fileDecl = project.createSourceFile(filename);
    makeModule(fileDecl, oaObject);
  }
}

function makeModule(
  fileDecl: SourceFile,
  oaObject: OpenAPIObject,
): void {
  for (
    const [pathname, pathItem] of Object.entries<PathItemObject>(oaObject.paths)
  ) {
    const { identifier, pathnameParams } = parsePathname(pathname);
    makePathnameParamsDecls(fileDecl, identifier, pathnameParams, pathItem);
    return;

    // TODO:
    // makeSearchParamsDecls(fileDecl, pathname, pathItem);
    // makeRequestBodyDecls(fileDecl, pathname, pathItem);
    // makeResponseDecls(fileDecl, pathname, pathItem);
  }
}

const METHODS = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
] as const;

function makePathnameParamsDecls(
  fileDecl: SourceFile,
  identifier: string,
  pathnameParams: string[],
  pathItem: PathItemObject,
): void {
  for (const method of METHODS) {
    const operation = pathItem[method];
    if (!operation) {
      continue;
    }

    makePathnameParamsDecl(
      fileDecl,
      identifier,
      method,
      pathnameParams,
      operation,
    );
  }
}

function makePathnameParamsDecl(
  fileDecl: SourceFile,
  baseIdentifier: string,
  method: string,
  pathnameParams: string[],
  operation: OperationObject,
): void {
  // TODO:
  const identifier = `${baseIdentifier}${pascalCase(method)}PathnameParams`;
  const tags: JSDocTagStructure[] = [];
  const decl = fileDecl.addInterface({
    docs: [{
      tags: [
        {
          tagName: "summary",
          text: operation.summary,
        },
        {
          tagName: "description",
          text: operation.description,
        },
        {
          tagName: "tags",
          text: operation.tags?.join(", "),
        },
        {
          tagName: "see",
          text: operation.externalDocs?.url,
        },
      ],
    }],
    isExported: true,
    name: identifier,
    properties: pathnameParams.map((param) => ({
      name: param,
      type: "string",
    })),
  });
  console.log(decl.getText(true));
  console.log({ operation });
}

function parsePathname(
  path: string,
): { identifier: string; pathnameParams: string[] } {
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

function tagsFromOperation(operation: OperationObject): JSDocTagStructure[] {
  const tags: OptionKind<JSDocTagStructure>[] = [];

  if (operation.summary) {
    tags.push({
      tagName: "summary",
      text: operation.summary,
    });
  }

  if (operation.description) {
    tags.push({
      tagName: "description",
      text: operation.description,
      kind: "text",
    });
  }

  if (operation.tags) {
    tags.push({
      tagName: "tags",
      text: operation.tags.join(", "),
      kind: "text",
    });
  }

  if (operation.externalDocs?.url) {
    tags.push({
      tagName: "see",
      text: operation.externalDocs.url,
      kind: "text",
    });
  }

  return tags;
}
