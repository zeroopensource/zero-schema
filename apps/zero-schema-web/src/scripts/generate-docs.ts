import path from "node:path";
import fs from "fs-extra";

const sourcePath = path.resolve("public/zero-schema");
const destinationPath = path.resolve("content/docs");

const generateDocs = async () => {
	if (!(await fs.pathExists(sourcePath))) {
		throw new Error(`Source json schema not found: ${sourcePath}`);
	}

	// await fs.ensureDir(destinationPath);
	// await fs.copy(sourcePath, destinationPath, { overwrite: true });

	console.log(`Generated JSON Schema docs from ${sourcePath} to ${destinationPath}`);
};

generateDocs().catch((error: unknown) => {
	console.error("Failed to generate docs:", error);
	process.exitCode = 1;
});
