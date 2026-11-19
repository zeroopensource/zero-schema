/** biome-ignore-all lint/performance/useTopLevelRegex: <explanation> */
import path from "node:path";
import fs from "fs-extra";
import klaw from "klaw";
import {docsPath} from "./generate-docs";

const findMarkdownFiles = async (docsPath: string): Promise<string[]> => {
  const files: string[] = [];
  await new Promise<void>((resolve, reject) => {
    klaw(docsPath)
      .on("data", (item) => {
        if (!item.stats.isDirectory() && path.extname(item.path) === ".md") {
          files.push(item.path);
        }
      })
      .on("end", resolve)
      .on("error", reject);
  });
  return files;
};

const patchLinks = (content: string): string => {
  const patch1 = content.replaceAll("public/", "");
  const schemaUrl = patch1.match(
    /```txt\s*\r?\n(https?:\/\/[^\s`]+)\s*\r?\n```/
  )?.[1];
  const patch2 = schemaUrl
    ? patch1.replace(
        /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
        (link, label: string, target: string, title?: string) => {
          if (!/\.(?:md|json)(?:#.*)?$/i.test(target)) {
            return link;
          }
          const fragment =
            title?.match(/#\S+/)?.[0] ?? target.match(/#.*$/)?.[0] ?? "";
          const titleAttribute = title ? ` "${title}"` : "";
          return `[${label}](${schemaUrl}${fragment}${titleAttribute})`;
        }
      )
    : patch1;
  return patch2;
};

export const mergeDocs = async (docsPath: string) => {
  const markdownFiles = await findMarkdownFiles(docsPath);
  const inputSchemaSuffix = "-input-schema.md";

  await Promise.all(
    markdownFiles
      .filter((markdownFile) => markdownFile.endsWith(inputSchemaSuffix))
      .map(async (inputSchemaFile) => {
        const schemaFile = inputSchemaFile.replace(
          inputSchemaSuffix,
          "-schema.md"
        );
        if (!(await fs.pathExists(schemaFile))) {
          return;
        }

        const [schemaContent, inputSchemaContent] = await Promise.all([
          fs.readFile(schemaFile, "utf8"),
          fs.readFile(inputSchemaFile, "utf8"),
        ]);
        const inputBody = inputSchemaContent.replace(
          /^---\r?\n[\s\S]*?\r?\n---\r?\n*/,
          ""
        );
        await fs.writeFile(
          schemaFile,
          `${schemaContent.trimEnd()}\n---\n${inputBody.trimStart()}`,
          "utf8"
        );
        await fs.remove(inputSchemaFile);
      })
  );
}

export const patchDocs = async ({ docsPath }: { docsPath: string }) => {
  const markdownFiles = await findMarkdownFiles(docsPath);
  await Promise.all(
    markdownFiles.map(async (markdownFile) => {
      const content = await fs.readFile(markdownFile, "utf8");
      const title = content
        .match(/^#{1,6}\s+(.+?)\s*#*\s*$/m)?.[1]
        ?.trim()
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\s+Schema\s*$/i, "");
      const frontmatter = ["---", `title: ${title}`, "---", ""].join("\n");
      const patchedContent = `${frontmatter}${await patchLinks(content)}`;
      const shouldRemove = ["Untitled", "README"].some((keyword) =>
        title?.includes(keyword)
      );
      if (shouldRemove) {
        await fs.remove(markdownFile);
      } else {
        await fs.writeFile(markdownFile, patchedContent, "utf8");
      }
    })
  );
  await mergeDocs(docsPath);
  console.log(
    `Patched ${markdownFiles.length} JSON Schema docs in ${docsPath}`
  );
};
