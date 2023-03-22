import type { OperationObject } from "../deps.ts";

export const METHODS = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
] as const;

export type Method = typeof METHODS[number];

export function buildInterfaceDocsFromOperation(
  operation: OperationObject,
): string[] {
  const docs: string[] = [];
  if (operation.externalDocs?.url) {
    docs.push(operation.externalDocs.url);
  }

  return docs;
}
