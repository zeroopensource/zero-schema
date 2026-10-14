import path from "node:path";
import fs from "fs-extra";
import { z } from "zod";
import { schemas } from "./../src/index";

const buildJsonSchema = async (schema: z.ZodObject) => {
  const jsonSchema = z.toJSONSchema(schema);
  const outputPath = path.join(
    process.cwd(),
    "public/zero-index/zero-index-schema.json"
  );
  await fs.remove(outputPath);
  await fs.outputJson(outputPath, jsonSchema, {
    spaces: 2,
  });
  console.log(`Generated ${outputPath}`);
};

const buildJsonSchemas = () => {
  for (const schema of schemas) {
    buildJsonSchema(schema);
  }
};
buildJsonSchemas();
