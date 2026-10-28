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

const patchLinks = async (content: string): Promise<string> => {
  
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
      const patchedContent = `${frontmatter}${content.replace("public/", "")}`;
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
  console.log(
    `Patched ${markdownFiles.length} JSON Schema docs in ${docsPath}`
  );
};


