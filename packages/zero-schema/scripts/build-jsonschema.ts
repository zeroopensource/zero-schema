import path from "node:path";
import fs from "fs-extra";
import { z } from "zod";
import { schemas } from "./../src/index";

const toKebabCase = (value: string) =>
  value.replace(
    /[A-Z]/gu,
    (letter, index) => `${index > 0 ? "-" : ""}${letter.toLowerCase()}`
  );

const schemaUrl = "https://zero-schema.zeroopensource.org/zero-schema";

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

const buildJsonSchemas = async () => {
  const exports = await import("./../src/index");
  await Promise.all(
    Object.entries(schemas).map(async ([name, schema]) => {
      const example = (exports as Record<string, unknown>)[`${name}Example`];
      const examples =
        example === undefined || example === null ? [] : [example];
      await buildJsonSchema(name, schema.meta({ examples }));
    })
  );
};
buildJsonSchemas();
