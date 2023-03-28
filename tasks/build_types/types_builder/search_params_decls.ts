import type { OperationObject, PathItemObject, SourceFile } from "../deps.ts";
import { pascalCase } from "../deps.ts";
import type { Method } from "./shared.ts";
import { buildInterfaceDocsFromOperation, METHODS } from "./shared.ts";

export function buildSearchParams(
  fileDecl: SourceFile,
  baseIdentifier: string,
  pathnameParams: string[],
  pathItem: PathItemObject,
): void {
  for (const method of METHODS) {
    const operation = pathItem[method];
    if (operation === undefined) {
      continue;
    }

    buildSearchParam(
      fileDecl,
      baseIdentifier,
      pathnameParams,
      method,
      operation,
    );
  }
}

function buildSearchParam(
  fileDecl: SourceFile,
  baseIdentifier: string,
  pathnameParams: string[],
  method: Method,
  operation: OperationObject,
): void {
  const identifier = buildSearchParamsIdentifier(baseIdentifier, method);
  const docs = buildInterfaceDocsFromOperation(operation);
  const decl = fileDecl.addInterface({
    docs,
    isExported: true,
    name: identifier,
    properties: pathnameParams.map((param) => ({
      name: param,
      type: "string",
    })),
  });
  console.log({ text: decl.getText() });
}

function buildSearchParamsIdentifier(
  baseIdentifier: string,
  method: Method,
): string {
  return `${baseIdentifier}${pascalCase(method)}SearchParams`;
}
