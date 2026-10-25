import path from "node:path";
import { main as jsonschema2md } from "@adobe/jsonschema2md";
import fs from "fs-extra";

const sourceSchemaPath = path.resolve(
  "./node_modules/@zeroopensource/zero-schema/dist/public/zero-schema"
);
const publicSchemaPath = path.resolve("./public/zero-schema");

const copyJsonSchema = async () => {
  try {
    await fs.emptyDir(publicSchemaPath);
    await fs.copy(sourceSchemaPath, publicSchemaPath);
  } catch (err) {
    console.error("Error copying JsonSchema:", err);
  }
};

const generateDocs = async () => {
  const docsPath = path.resolve("./content/docs/zero-schema");
  try {
    // await copyJsonSchema();
    await fs.ensureDir(docsPath);
    await fs.emptyDir(docsPath);
    await fs.ensureDir(publicSchemaPath);
    await fs.emptyDir(publicSchemaPath);

    // The package's public API takes (schema, options); its CLI accepts only
    // options because it loads the schemas from the input directory itself.
    await jsonschema2md([
      "node",
      "jsonschema2md",
      "--input",
      sourceSchemaPath,
      "--out",
      docsPath,
      "--schema-out",
      publicSchemaPath,
    ]);

    console.log(
      `Generated JSON Schema docs from ${sourceSchemaPath} to ${docsPath}`
    );
  } catch (err) {
    console.error("Error copying JsonSchema:", err);
  }
};
generateDocs();
