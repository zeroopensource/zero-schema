import path from "node:path";
import fs from "fs-extra";
import {mergeDocs} from "./patch-docs";

const sourceSchemaPath = path.resolve(
  "./node_modules/@zeroopensource/zero-schema/dist/public/zero-schema"
);
const publicSchemaPath = path.resolve("./public/zero-schema");
const docsPath = path.resolve("./content/docs/zero-schema");

const generateDocsV2 = async () => {
  try {
    await fs.emptyDir(docsPath);
    await fs.emptyDir(publicSchemaPath);
    await fs.copy(sourceSchemaPath, publicSchemaPath);

    const schemaFiles = (await fs.readdir(publicSchemaPath))
      .filter((fileName) => fileName.endsWith(".json"))
      .sort();

    await Promise.all(
      schemaFiles.map(async (fileName) => {
        const schemaPath = path.join(publicSchemaPath, fileName);
        const schema = (await fs.readJson(schemaPath)) as Record<
          string,
          unknown
        >;

        const parts = [
          `# ${schema.title} Schema`,
          `\`\`\`\n${schema.$id}\n\`\`\``,
          `\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\``
        ]
        const markdown = parts.join("\n");
       
        await fs.writeFile(
          path.join(docsPath, `${path.basename(fileName, ".json")}.md`),
          `---\ntitle: ${schema.title}\n---\n\n${markdown}\n`,
          "utf8"
        );
      })
    );

    await mergeDocs(docsPath);

    console.log(
      `Generated ${schemaFiles.length} docs from ${publicSchemaPath} to ${docsPath}`
    );
  } catch (error) {
    console.error("Error generating docs:", error);
    process.exitCode = 1;
  }
};

generateDocsV2();
