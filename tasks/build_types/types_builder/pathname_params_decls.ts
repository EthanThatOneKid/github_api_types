import type { OperationObject, PathItemObject, SourceFile } from "../deps.ts";
import { pascalCase } from "../deps.ts";
import type { Method } from "./shared.ts";
import { buildInterfaceDocsFromOperation, METHODS } from "./shared.ts";

export function buildPathnameParams(
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

    buildPathnameParam(
      fileDecl,
      baseIdentifier,
      pathnameParams,
      method,
      operation,
    );
  }
}

function buildPathnameParam(
  fileDecl: SourceFile,
  baseIdentifier: string,
  pathnameParams: string[],
  method: Method,
  operation: OperationObject,
): void {
  const identifier = buildPathnameParamsIdentifier(baseIdentifier, method);
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

function buildPathnameParamsIdentifier(
  baseIdentifier: string,
  method: Method,
): string {
  return `${baseIdentifier}${pascalCase(method)}PathnameParams`;
}
