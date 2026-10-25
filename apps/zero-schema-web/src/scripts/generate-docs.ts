import path from "node:path";
import { jsonschema2md } from "@adobe/jsonschema2md";
import fs from "fs-extra";

const sourceSchemaPath = path.resolve(
  "./node_modules/@zeroopensource/zero-schema/dist/public/zero-schema"
);
const publicSchemaPath = path.resolve("./public/zero-schema");

const copyJsonSchema = async () => {
  try {
    await fs.copy(sourceSchemaPath, publicSchemaPath);
  } catch (err) {
    console.error("Error copying JsonSchema:", err);
  }
};

const generateDocs = async () => {
  const destinationPath = path.resolve("./content/docs/zero-schema");
  try {
    // await copyJsonSchema();
    await fs.ensureDir(destinationPath);
    const markdown = jsonschema2md({
      includeReadme: true,
      outDir: destinationPath,
      schemaOut: publicSchemaPath,
      schemaPath: sourceSchemaPath,
    });

    console.log(
      `Generated JSON Schema docs from ${sourceSchemaPath} to ${destinationPath}`
    );
  } catch (err) {
    console.error("Error copying JsonSchema:", err);
  }
};
generateDocs();
