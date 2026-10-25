import path from "node:path";
import fs from "fs-extra";

const publicSchemaPath = path.resolve("./public/zero-schema");

const copyJsonSchema = async () => {
  const sourcePath = path.resolve(
    "./node_modules/@zeroopensource/zero-schema/dist/public/zero-schema"
  );
  try {
    await fs.copy(sourcePath, publicSchemaPath);
  } catch (err) {
    console.error("Error copying JsonSchema:", err);
  }
};

const generateDocs = async () => {
  const destinationPath = path.resolve("./content/docs");
  try {
    await copyJsonSchema();

    console.log(
      `Generated JSON Schema docs from ${publicSchemaPath} to ${destinationPath}`
    );
  } catch (err) {
    console.error("Error copying JsonSchema:", err);
  }
};
generateDocs();
