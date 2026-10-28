import path from "node:path";
import { main as jsonschema2md } from "@adobe/jsonschema2md";
import fs from "fs-extra";
import { patchDocs } from "./patch-docs";

const sourceSchemaPath = path.resolve(
  "./node_modules/@zeroopensource/zero-schema/dist/public/zero-schema"
);
const publicSchemaPath = path.resolve("./public/zero-schema");
const docsPath = path.resolve("./content/docs/zero-schema");
const runJsonschema2md = jsonschema2md as unknown as (
  args: string[]
) => Promise<number>;

const generateDocs = async () => {
  try {
    await fs.emptyDir(docsPath);
    await fs.emptyDir(publicSchemaPath);

    await runJsonschema2md([
      "node",
      "jsonschema2md",
      "--input",
      sourceSchemaPath,
      "--out",
      docsPath,
      "--schema-out",
      publicSchemaPath,
    ]);
    await patchDocs({ docsPath });

    console.log(`Generated docs from ${sourceSchemaPath} to ${docsPath}`);
  } catch (err) {
    console.error("Error generating docs:", err);
  }
};
generateDocs();
