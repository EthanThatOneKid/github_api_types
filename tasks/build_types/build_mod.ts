/**
 * Builds the mod.ts file featured in the root of this repository.
 */
export function buildMod(exports: string[]): string {
  let result = "";
  for (const specifier of exports) {
    result += `export * from "${specifier}";\r`;
  }
  return result;
}
