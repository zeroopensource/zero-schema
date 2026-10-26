import path from "node:path";
import fs from "fs-extra";
import { z } from "zod";
import { schemas } from "./../src/index";

const toKebabCase = (value: string) =>
  value.replace(/[A-Z]/g, (letter, index) => `${index > 0 ? "-" : ""}${letter.toLowerCase()}`);

const schemaUrl = 'https://zero-schema.zeroopensource.org/zero-schema'

const buildJsonSchema = async (name: string, schema: z.ZodObject) => {
  const jsonSchema = z.toJSONSchema(schema);
  const fileName = `${toKebabCase(name)}-schema.json`;
  const outputPath = path.join(
    process.cwd(),
    `dist/public/zero-schema/${fileName}`
  );
  jsonSchema.$id = `${schemaUrl}/${fileName}`;
  await fs.remove(outputPath);
  await fs.outputJson(outputPath, jsonSchema, {
    spaces: 2,
  });
  console.log(`Generated ${outputPath}`);
};

const buildJsonSchemas = () => {
  for (const [name, schema] of Object.entries(schemas)) {
    buildJsonSchema(name, schema);
  }
};
buildJsonSchemas();
