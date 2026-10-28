/** biome-ignore-all lint/performance/useTopLevelRegex: <explanation> */
import path from "node:path";
import fs from "fs-extra";
import klaw from "klaw";

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

export const patchDocs = async ({ docsPath }: { docsPath: string }) => {
  //   await deleteUnwantedDocs(sourcePath);
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
      const patchedContent = `${frontmatter}${content.replace(/^\s+/, "")}`;
      await fs.writeFile(markdownFile, patchedContent, "utf8");
    })
  );
  console.log(
    `Patched ${markdownFiles.length} JSON Schema docs in ${docsPath}`
  );
};

// const getFirstHeader = (content: string) => {
//   const match = content.match(/^#{1,6}\s+(.+?)\s*#*\s*$/m);
//   return match?.[1]
//     ?.trim()
//     .replace(/\*\*(.*?)\*\*/g, "$1")
//     .replace(/\s+Schema\s*$/i, "");
// };

// const getDescription = (content: string) => {
//   const codeBlock = content.match(/^```[^\n]*\n[\s\S]*?^```\s*$/m);
//   if (!codeBlock || codeBlock.index === undefined) return undefined;

//   const afterCodeBlock = content.slice(codeBlock.index + codeBlock[0].length);
//   const tableStart = afterCodeBlock.search(/^\s*\|/m);
//   const beforeTable = tableStart < 0 ? afterCodeBlock : afterCodeBlock.slice(0, tableStart);
//   const paragraphs = beforeTable
//     .split(/\n\s*\n/)
//     .map((paragraph) => paragraph.trim())
//     .filter(Boolean);

//   const description = paragraphs[0]
//     ?.replace(/^#+\s*/, "")
//     .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
//     .replace(/\*\*(.*?)\*\*|__(.*?)__/g, "$1$2")
//     .replace(/\*(.*?)\*|_(.*?)_/g, "$1$2")
//     .replace(/\s+/g, " ")
//     .trim();

//   return description || undefined;
// };

// const yamlString = (value: string) => JSON.stringify(value);

// const deleteUnwantedDocs = async (directory: string): Promise<void> => {
//   const entries = await fs.readdir(directory, { withFileTypes: true });

//   await Promise.all(
//     entries.map(async (entry) => {
//       const entryPath = path.join(directory, entry.name);
//       if (entry.isDirectory()) {
//         await deleteUnwantedDocs(entryPath);
//       } else if (
//         entry.isFile() &&
//         (entry.name.toLowerCase() === "readme.md" || /properties/i.test(entry.name))
//       ) {
//         await fs.remove(entryPath);
//       }
//     }),
//   );
// };

// const addFrontmatter = (content: string) => {
//   // Strip frontmatter previously added by this script so repeated runs stay clean.
//   const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\s*\r?\n?/, "");
//   const title = getFirstHeader(body);
//   if (!title) return content;

//   const description = getDescription(body);
//   const frontmatter = [
//     "---",
//     `title: ${yamlString(title)}`,
//     ...(description ? [`description: ${yamlString(description)}`] : []),
//     "---",
//     "",
//   ].join("\n");

//   return `${frontmatter}${body.replace(/^\s+/, "")}`;
// };
