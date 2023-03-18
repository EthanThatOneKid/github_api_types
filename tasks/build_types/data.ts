import type { OpenAPIObject } from "./deps.ts";

import GITHUB_OPENAPI from "https://github.com/github/rest-api-description/raw/main/descriptions/api.github.com/api.github.com.json" assert {
  type: "json",
};

import GITHUB_2022_11_28_OPENAPI from "https://github.com/github/rest-api-description/raw/main/descriptions/api.github.com/api.github.com.2022-11-28.json" assert {
  type: "json",
};

export const MODULES = {
  "api.github.com.ts": GITHUB_OPENAPI as unknown as OpenAPIObject,
  "api.github.com.2022-11-28.ts":
    GITHUB_2022_11_28_OPENAPI as unknown as OpenAPIObject,
} as const;
