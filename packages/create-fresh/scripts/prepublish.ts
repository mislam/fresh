import fs from "node:fs";
import path from "node:path";

// recursively find all .gitignore files in a directory
function findGitignoreFiles(dir: string, fileList: string[] = []): string[] {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			findGitignoreFiles(filePath, fileList);
		} else if (file === ".gitignore") {
			fileList.push(filePath);
		}
	}

	return fileList;
}

// find all .gitignore files in recipes directory
const recipesDir = path.resolve("recipes");
const gitignoreFiles = findGitignoreFiles(recipesDir);

// rename each .gitignore to gitignore before publishing
for (const file of gitignoreFiles) {
	const newName = path.join(path.dirname(file), "gitignore");
	fs.renameSync(file, newName);
	console.log(`Renamed: ${file} -> ${newName}`);
}
