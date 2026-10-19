import path from "node:path";
import fs from "fs-extra";

const sourcePath = path.resolve("content/docs/zero-schema");

const getFirstHeader = (content: string) => {
  const match = content.match(/^#{1,6}\s+(.+?)\s*#*\s*$/m);
  return match?.[1]?.trim().replace(/\*\*(.*?)\*\*/g, "$1");
};

const getDescription = (content: string) => {
  const codeBlock = content.match(/^```[^\n]*\n[\s\S]*?^```\s*$/m);
  if (!codeBlock || codeBlock.index === undefined) return undefined;

  const afterCodeBlock = content.slice(codeBlock.index + codeBlock[0].length);
  const tableStart = afterCodeBlock.search(/^\s*\|/m);
  const beforeTable = tableStart < 0 ? afterCodeBlock : afterCodeBlock.slice(0, tableStart);
  const paragraphs = beforeTable
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const description = paragraphs[0]
    ?.replace(/^#+\s*/, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*(.*?)\*\*|__(.*?)__/g, "$1$2")
    .replace(/\*(.*?)\*|_(.*?)_/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim();

  return description || undefined;
};

const yamlString = (value: string) => JSON.stringify(value);

const findMarkdownFiles = async (directory: string): Promise<string[]> => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return findMarkdownFiles(entryPath);
      return entry.isFile() && /\.mdx?$/i.test(entry.name) ? [entryPath] : [];
    }),
  );

  return nestedFiles.flat();
};

const deleteUnwantedDocs = async (directory: string): Promise<void> => {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await deleteUnwantedDocs(entryPath);
      } else if (
        entry.isFile() &&
        (entry.name.toLowerCase() === "readme.md" || /properties/i.test(entry.name))
      ) {
        await fs.remove(entryPath);
      }
    }),
  );
};

const addFrontmatter = (content: string) => {
  // Strip frontmatter previously added by this script so repeated runs stay clean.
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\s*\r?\n?/, "");
  const title = getFirstHeader(body);
  if (!title) return content;

  const description = getDescription(body);
  const frontmatter = [
    "---",
    `title: ${yamlString(title)}`,
    ...(description ? [`description: ${yamlString(description)}`] : []),
    "---",
    "",
  ].join("\n");

  return `${frontmatter}${body.replace(/^\s+/, "")}`;
};

const patchDocs = async () => {
  if (!(await fs.pathExists(sourcePath))) {
    throw new Error(`Source not found: ${sourcePath}`);
  }

  await deleteUnwantedDocs(sourcePath);
  const markdownFiles = await findMarkdownFiles(sourcePath);

  for (const filePath of markdownFiles) {
    const content = await fs.readFile(filePath, "utf8");
    const patched = addFrontmatter(content);
    if (patched !== content) await fs.writeFile(filePath, patched, "utf8");
  }

  console.log(`Patched ${markdownFiles.length} JSON Schema docs in ${sourcePath}`);
};

patchDocs().catch((error: unknown) => {
  console.error("Failed to patch docs:", error);
  process.exitCode = 1;
});
