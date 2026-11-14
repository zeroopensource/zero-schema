import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import fs from "fs-extra";
import klaw from "klaw";
import { describe, expect, it } from "vitest";

const schemasDirs = ["dist/public/zero-schema"];

async function findJsonFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of klaw(dir)) {
    if (entry.stats.isFile() && entry.path.endsWith(".json")) {
      files.push(entry.path);
    }
  }
  return files;
}

describe("BlogPost JSON Schema", () => {
  it("should compile every JSON schema in schemasDirs recursively", async () => {
    const schemaFiles = (
      await Promise.all(schemasDirs.map((dir) => findJsonFiles(dir)))
    ).flat();
    expect(schemaFiles.length).toBeGreaterThan(0);

    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);

    const schemas = await Promise.all(
      schemaFiles.map(async (file) => {
        const schema = await fs.readJson(file);
        if (!schema.$schema) {
          throw new Error(`${file} is missing the $schema property`);
        }
        ajv.addSchema(schema);
        return { file, schema };
      })
    );

    for (const { file, schema } of schemas) {
      expect(ajv.getSchema(schema.$id), `${file} should compile`).toBeDefined();
    }
  });
});
