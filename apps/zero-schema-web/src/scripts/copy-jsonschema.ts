import path from "node:path";
import fs from "fs-extra";

const sourcePath = path.resolve("../../packages/zero-schema/dist/public");
const destinationPath = path.resolve("public");

const copyJsonSchema = async () => {
	if (!(await fs.pathExists(sourcePath))) {
		throw new Error(`JSON Schema build output not found: ${sourcePath}`);
	}

	await fs.ensureDir(destinationPath);
	for (const entry of await fs.readdir(sourcePath)) {
		const sourceEntryPath = path.join(sourcePath, entry);
		const destinationEntryPath = path.join(destinationPath, entry);
		if (
			(await fs.stat(sourceEntryPath)).isDirectory() &&
			(await fs.pathExists(destinationEntryPath)) &&
			(await fs.stat(destinationEntryPath)).isDirectory()
		) {
			await fs.remove(destinationEntryPath);
		}
	}
	await fs.copy(sourcePath, destinationPath, { overwrite: true });

	console.log(`Copied JSON Schema files from ${sourcePath} to ${destinationPath}`);
};

copyJsonSchema().catch((error: unknown) => {
	console.error("Failed to copy JSON Schema files:", error);
	process.exitCode = 1;
});
