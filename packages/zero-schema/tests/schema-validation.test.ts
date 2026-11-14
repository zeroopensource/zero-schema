import type { AnySchema } from "ajv/dist/2020.js";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import fs from "fs-extra";
import klaw from "klaw";
import { describe, expect, it } from "vitest";

const modelDirs = ["src/models"];

async function findJsonFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of klaw(dir)) {
    if (entry.stats.isFile() && entry.path.endsWith(".json")) {
      files.push(entry.path);
    }
  }
  return files;
}

const files = (await Promise.all(modelDirs.map(findJsonFiles))).flat();

describe("JSON schemas validation", () => {
  it.each(files)("validates %s against its fetched $schema", async (file) => {
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);

    const document: unknown = await fs.readJson(file);
    const schemaUrl =
      typeof (document as { $schema?: unknown } | null)?.$schema === "string"
        ? (document as { $schema: string }).$schema
        : "";

    const response = await fetch(schemaUrl);
    expect(
      response.ok,
      `fetching ${schemaUrl} for ${file} returned HTTP ${response.status}`
    ).toBe(true);

    const schema = (await response.json()) as AnySchema;
    const validate = ajv.compile(schema);
    const valid = validate(document);
    const validationErrors = (validate.errors ?? []).map((error) => {
      const path = error.instancePath || "/";
      const params = Object.keys(error.params).length
        ? ` (${JSON.stringify(error.params)})`
        : "";
      return `  ${path} [${error.keyword}] ${error.message}${params}`;
    });
    expect(
      valid,
      `${file} does not satisfy ${schemaUrl}:\n${validationErrors.join("\n")}`
    ).toBe(true);
  });
});
