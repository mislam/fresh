#!/usr/bin/env node

import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as clack from "@clack/prompts";
import minimist from "minimist";
import colors from "picocolors";

const { red, green, blue, bold, yellow, dim, strikethrough } = colors;

// Track child processes for proper cleanup
const childProcesses: child_process.ChildProcess[] = [];

// Set up process termination handler
process.on("SIGINT", () => {
	for (const child of childProcesses) {
		if (!child.killed) {
			child.kill();
		}
	}
	process.exit(0);
});

// Get the directory where this script resides
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PkgInfo {
	name: string;
	version: string;
}

interface RecipeMetadata {
	name: string;
	pkgManager?: string;
	description?: string;
	version?: string;
}

interface PackageJson {
	name: string;
	version: string;
	description?: string;
	private?: boolean;
	type?: string;
	main?: string;
	scripts?: Record<string, string>;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	recipe?: {
		name?: string;
		version?: string;
		description?: string;
		pkgManager?: string;
	};
	[key: string]: unknown;
}

const cwd = process.cwd();
const recipesDir = path.resolve(__dirname, "../recipes");
const defaultTargetDir = "my-app";

// Read available recipes
const recipes = fs
	.readdirSync(recipesDir)
	.filter((f) => fs.statSync(path.join(recipesDir, f)).isDirectory());

// Detect package manager
const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
const pkgManager = pkgInfo ? pkgInfo.name : "npm";

// Parse command line arguments
const argv = minimist<{
	recipe?: string;
	help?: boolean;
}>(process.argv.slice(2), {
	default: { help: false },
	alias: { h: "help", r: "recipe" },
	string: ["_"], // force all positional arguments to be parsed as strings
});

function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
	if (!userAgent) return undefined;
	const pkgSpec = userAgent.split(" ")[0];
	const pkgSpecArr = pkgSpec.split("/");
	return {
		name: pkgSpecArr[0],
		version: pkgSpecArr[1],
	};
}

function runCommand(
	command: string,
	args: string[],
	cwd: string,
	silent = false,
): Promise<boolean> {
	return new Promise((resolve) => {
		try {
			const child = child_process.spawn(command, args, {
				cwd,
				// Use 'ignore' for stdio when in silent mode to hide package manager output
				stdio: silent ? ["ignore", "ignore", "pipe"] : "inherit",
				shell: process.platform === "win32",
			});

			// Add to tracked processes for cleanup
			childProcesses.push(child);

			if (silent) {
				// Even in silent mode, we want to capture error messages for debugging
				// but we won't print them to avoid breaking the UI
				child.stderr?.on("data", () => {
					// Don't log anything when in silent mode
				});
			}

			child.on("error", (error) => {
				// Only log errors when not in silent mode
				if (!silent) {
					console.error(`${red("✖")} Failed to execute ${command}: ${error.message}`);
				}
				resolve(false);
			});

			child.on("close", (code) => {
				// Remove from tracked processes
				const index = childProcesses.indexOf(child);
				if (index !== -1) {
					childProcesses.splice(index, 1);
				}
				resolve(code === 0);
			});
		} catch (error) {
			// Only log errors when not in silent mode
			if (!silent) {
				console.error(`${red("✖")} Failed to execute ${command}: ${error}`);
			}
			resolve(false);
		}
	});
}

function getRecipeMetadata(recipePath: string): RecipeMetadata {
	const recipeName = path.basename(recipePath);
	const packageJsonPath = path.join(recipePath, "package.json");
	const metadata: RecipeMetadata = {
		name: recipeName,
	};

	// Get metadata from package.json
	if (fs.existsSync(packageJsonPath)) {
		try {
			const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
			metadata.version = pkg.version;
			metadata.description = pkg.description;
			// Get recipe-specific metadata from the "recipe" field if it exists
			metadata.pkgManager = pkg.recipe?.pkgManager;
		} catch (error) {
			console.log(`${yellow("⚠")} Warning: Invalid package.json in ${recipePath}`);
		}
	}

	return metadata;
}

function getRecipeChoices() {
	return recipes.map((recipeName) => {
		const recipePath = path.join(recipesDir, recipeName);
		const metadata = getRecipeMetadata(recipePath);

		// Check if recipe has package manager requirements
		const isCompatible = !metadata.pkgManager || metadata.pkgManager === pkgManager;

		const description = metadata.description || "No description available";

		return {
			value: recipeName,
			// Indicate in the label if recipe requires a different package manager
			label: isCompatible
				? `${recipeName} ${dim(`- ${description}`)}`
				: `${strikethrough(recipeName)} ${dim(`(requires ${metadata.pkgManager}) - ${description}`)}`,
			hint: undefined, // Moving the hint into the label with a dash
		};
	});
}

function isCompatiblePackageManager(recipeName: string, currentPkgManager: string): boolean {
	const recipePath = path.join(recipesDir, recipeName);
	const metadata = getRecipeMetadata(recipePath);
	return !metadata.pkgManager || metadata.pkgManager === currentPkgManager;
}

function preparePackageJson(
	pkg: PackageJson,
	recipeName: string,
	recipeMetadata: RecipeMetadata,
	projectName: string,
): PackageJson {
	// Create a new object instead of modifying the original
	return {
		...pkg,
		name: projectName,
		version: "0.1.0",
		description: undefined, // Remove description from root level
		recipe: {
			name: recipeName,
			version: recipeMetadata.version,
			description: recipeMetadata.description,
			pkgManager: pkg.recipe?.pkgManager || recipeMetadata.pkgManager,
		},
	};
}

function formatTargetDir(targetDir: string | undefined) {
	if (!targetDir) return undefined;
	// Normalize the path and remove trailing slashes
	return path.normalize(targetDir.trim()).replace(/[\/\\]+$/, "");
}

function isValidPackageName(projectName: string) {
	return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

function toValidPackageName(projectName: string) {
	return projectName
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/^[._]/, "")
		.replace(/[^a-z\d\-~]+/g, "-");
}

function isEmpty(path: string) {
	if (!fs.existsSync(path)) return true;
	const files = fs.readdirSync(path);
	return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function emptyDir(dir: string) {
	if (!fs.existsSync(dir)) {
		return;
	}
	for (const file of fs.readdirSync(dir)) {
		if (file === ".git") {
			continue;
		}
		fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
	}
}

// Improved copy functions with better error handling and symlink support
function copy(src: string, dest: string) {
	try {
		// Validate paths to prevent directory traversal
		if (!isPathSafe(path.dirname(src), src) || !isPathSafe(path.dirname(dest), dest)) {
			throw new Error("Path traversal detected. Aborting copy operation.");
		}

		const stat = fs.statSync(src);
		if (stat.isDirectory()) {
			copyDir(src, dest);
		} else if (stat.isSymbolicLink()) {
			const linkTarget = fs.readlinkSync(src);
			// Verify symlink target is safe
			if (!isPathSafe(path.dirname(src), path.resolve(path.dirname(src), linkTarget))) {
				console.warn(`${yellow("⚠")} Skipping unsafe symlink: ${src} -> ${linkTarget}`);
				return;
			}
			fs.symlinkSync(linkTarget, dest);
		} else {
			fs.copyFileSync(src, dest);
		}
	} catch (error) {
		console.error(`${red("✖")} Failed to copy ${src} to ${dest}: ${error}`);
		throw error; // Rethrow to handle in the calling function
	}
}

function copyDir(srcDir: string, destDir: string) {
	try {
		fs.mkdirSync(destDir, { recursive: true });

		const files = fs.readdirSync(srcDir);
		const total = files.length;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			// Show progress for large recipes
			if (total > 10 && i % 5 === 0) {
				process.stdout.write(`\rCopying files... (${i}/${total})`);
			}

			const srcFile = path.resolve(srcDir, file);
			const destFile = path.resolve(destDir, file);
			copy(srcFile, destFile);
		}

		if (total > 10) {
			process.stdout.write(`\rCopying files... (${total}/${total}) Complete!   \n`);
		}
	} catch (error) {
		console.error(`${red("✖")} Failed to copy directory ${srcDir} to ${destDir}: ${error}`);
		throw error; // Rethrow to handle in the calling function
	}
}

function isPathSafe(basePath: string, targetPath: string): boolean {
	const resolvedBase = path.resolve(basePath);
	const resolvedTarget = path.resolve(targetPath);
	return resolvedTarget.startsWith(resolvedBase);
}

// CLI Help Message
const helpMessage = `
${bold(blue("create-fresh"))} - Fresh project scaffolding tool

${bold("Usage:")} ${pkgManager} create fresh [recipe] [directory]

${bold("Description:")}
  Create a fresh project with a recipe (e.g. honeybun).
  With no arguments, start the CLI in interactive mode.

${bold("Options:")}
  -h, --help                Show this help message
  -r, --recipe <name>       Specify a recipe to use

${bold("Available recipes:")} 
  ${recipes.join(", ")}

${bold("Examples:")}
  ${pkgManager} create fresh
  ${pkgManager} create fresh honeybun
  ${pkgManager} create fresh honeybun my-app
`;

function exitOnCancel() {
	clack.outro(`${red("✖")} Operation cancelled.`);
	process.exit(0);
}

async function isPackageManagerAvailable(manager: string): Promise<boolean> {
	try {
		// Use a custom execution that doesn't spawn a process at all if we can detect common package managers
		if (manager === "npm" || manager === "yarn" || manager === "pnpm" || manager === "bun") {
			const commandExists = child_process.spawnSync(
				process.platform === "win32" ? "where" : "which",
				[manager],
				{ stdio: "ignore" },
			);
			if (commandExists.status === 0) {
				return true;
			}
		}

		// Fall back to trying to run the command directly but completely silently
		return await runCommand(manager, ["--version"], cwd, true);
	} catch {
		return false;
	}
}

async function main() {
	// Get recipe argument and target directory
	let argRecipe: string | undefined;
	let argTargetDir: string | undefined;

	// Display help if requested
	if (argv.help) {
		console.log(helpMessage);
		return;
	}

	// Determine if first argument is a recipe or target directory
	if (argv._[0] && recipes.includes(argv._[0])) {
		argRecipe = argv._[0];
		argTargetDir = formatTargetDir(argv._[1]);
	} else {
		argTargetDir = formatTargetDir(argv._[0]);
	}

	// Alternative: Check for recipe provided via --recipe flag
	if (argv.recipe && recipes.includes(argv.recipe)) {
		argRecipe = argv.recipe;
	}

	let targetDir = argTargetDir || defaultTargetDir;
	let recipe = argRecipe;
	const getProjectName = () => path.basename(path.resolve(targetDir));

	// Early compatibility check if recipe is provided as argument
	// Do this before showing any UI
	if (argRecipe) {
		if (!isCompatiblePackageManager(argRecipe, pkgManager)) {
			const recipePath = path.join(recipesDir, argRecipe);
			const metadata = getRecipeMetadata(recipePath);

			// Check if the required package manager is available without showing a spinner
			// This prevents an empty prompt line from appearing in the UI
			const isAvailable = await isPackageManagerAvailable(metadata.pkgManager || "");

			// Start the UI for a clean appearance
			clack.intro(bold(blue("Fresh - Scaffold Your Next Project ✨")));

			if (!isAvailable) {
				clack.outro(
					`${red("✖")} The ${argRecipe} recipe requires ${metadata.pkgManager}, but it's not installed.\n` +
						`     Please install ${metadata.pkgManager} and try again.`,
				);
				return;
			}

			clack.outro(
				`${red("✖")} The ${argRecipe} recipe requires ${metadata.pkgManager}.\n` +
					`     Please use: ${green(`${metadata.pkgManager} create fresh ${argRecipe}`)}`,
			);
			return;
		}
	}

	// Begin CLI interaction
	clack.intro(bold(blue("Fresh - Scaffold Your Next Project ✨")));

	// Ask for recipe if not provided as an argument
	if (!recipe) {
		const recipeResult = await clack.select({
			message: "Select a recipe:",
			options: getRecipeChoices(),
		});

		if (clack.isCancel(recipeResult)) exitOnCancel();
		recipe = recipeResult as string;

		// Check compatibility if recipe was selected interactively
		const recipePath = path.join(recipesDir, recipe);
		const metadata = getRecipeMetadata(recipePath);

		if (metadata.pkgManager && metadata.pkgManager !== pkgManager) {
			// Check if the required package manager is available without showing a spinner
			// This prevents an empty prompt line from appearing in the UI
			const isAvailable = await isPackageManagerAvailable(metadata.pkgManager);

			if (!isAvailable) {
				clack.outro(
					`${red("✖")} The ${recipe} recipe requires ${metadata.pkgManager}, but it's not installed.\n` +
						`     Please install ${metadata.pkgManager} and try again.`,
				);
				process.exit(1);
			}

			clack.outro(
				`${red("✖")} The ${recipe} recipe requires ${metadata.pkgManager}.\n` +
					`     Please use: ${green(`${metadata.pkgManager} create fresh ${recipe}`)}`,
			);
			process.exit(1);
		}
	}

	// Ask for project name if not provided
	if (!argTargetDir) {
		const projectNameResult = await clack.text({
			message: "Project name:",
			placeholder: defaultTargetDir,
			initialValue: defaultTargetDir,
			validate: (value: string) => {
				if (value.trim() === "") return "Project name cannot be empty";
				return undefined;
			},
		});

		if (clack.isCancel(projectNameResult)) exitOnCancel();
		targetDir = formatTargetDir(projectNameResult as string) || defaultTargetDir;
	}

	// Check if targetDir exists and is not empty
	let overwrite = "no";
	if (fs.existsSync(targetDir) && !isEmpty(targetDir)) {
		const overwriteResult = await clack.select({
			message: `${targetDir === "." ? "Current directory" : `Target directory "${targetDir}"`} is not empty. Please choose how to proceed:`,
			options: [
				{ value: "no", label: "Cancel operation" },
				{ value: "yes", label: "Remove existing files and continue" },
				{ value: "ignore", label: "Ignore files and continue" },
			],
		});

		if (clack.isCancel(overwriteResult)) exitOnCancel();
		overwrite = overwriteResult as string;

		if (overwrite === "no") {
			exitOnCancel();
		}
	}

	// Check and fix package name if needed
	let packageName = getProjectName();
	if (!isValidPackageName(packageName)) {
		const suggestedName = toValidPackageName(packageName);
		const packageNameResult = await clack.text({
			message: "Package name:",
			placeholder: suggestedName,
			initialValue: suggestedName,
			validate: (value: string) => {
				if (!isValidPackageName(value)) return "Invalid package.json name";
				return undefined;
			},
		});

		if (clack.isCancel(packageNameResult)) exitOnCancel();
		packageName = packageNameResult as string;
	}

	// Validate recipe
	if (!recipe || !recipes.includes(recipe)) {
		clack.outro(`${red("✖")} Invalid recipe. Available recipes: ${recipes.join(", ")}`);
		return;
	}

	const recipePath = path.join(recipesDir, recipe);
	const recipeMetadata = getRecipeMetadata(recipePath);

	// Check package manager compatibility
	if (recipeMetadata.pkgManager && recipeMetadata.pkgManager !== pkgManager) {
		clack.outro(
			`${red("✖")} The ${recipe} recipe requires ${recipeMetadata.pkgManager}.\n` +
				`     Please use: ${green(`${recipeMetadata.pkgManager} create fresh ${recipe}`)}`,
		);
		return;
	}

	const root = path.join(cwd, targetDir);

	try {
		const spinner = clack.spinner();
		let createdDirectory = false;

		// Prepare the directory
		if (overwrite === "yes") {
			spinner.start("Clearing existing directory");
			emptyDir(root);
			spinner.stop("Directory cleared");
		} else if (!fs.existsSync(root)) {
			spinner.start("Creating project directory");
			fs.mkdirSync(root, { recursive: true });
			createdDirectory = true;
			spinner.stop("Directory created");
		}

		spinner.start(`Scaffolding project using ${recipe} recipe`);

		// Copy all files from the recipe to the new project (except package.json)
		const files = fs.readdirSync(recipePath);
		for (const file of files.filter((f) => f !== "package.json")) {
			const src = path.join(recipePath, file);
			const dest = path.join(root, file);
			copy(src, dest);
		}

		// Update package.json and place it in the new project
		try {
			const pkgContent = fs.readFileSync(path.join(recipePath, "package.json"), "utf-8");
			const pkg = JSON.parse(pkgContent);
			const updatedPkg = preparePackageJson(pkg, recipe, recipeMetadata, packageName);
			fs.writeFileSync(
				path.join(root, "package.json"),
				`${JSON.stringify(updatedPkg, null, "\t")}\n`,
			);
			spinner.stop("Project scaffolded successfully");
		} catch (error) {
			spinner.stop(`Failed to update package.json: ${error}`);
			throw error;
		}

		// When installing dependencies, respect the recipe's required package manager
		let installCommand = pkgManager;
		let installArgs = pkgManager === "yarn" ? [] : ["install"];

		if (recipeMetadata.pkgManager) {
			installCommand = recipeMetadata.pkgManager;
			installArgs = recipeMetadata.pkgManager === "yarn" ? [] : ["install"];
		}

		// Ask before installing dependencies
		const shouldInstallDeps = await clack.select({
			message: `Install dependencies with ${installCommand}?`,
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
			],
		});

		if (clack.isCancel(shouldInstallDeps)) exitOnCancel();

		let installSuccess = false;
		if (shouldInstallDeps === "yes") {
			// Install dependencies
			spinner.start("Installing dependencies");

			switch (installCommand) {
				case "yarn":
					installSuccess = await runCommand("yarn", installArgs, root, true);
					break;
				case "pnpm":
					installSuccess = await runCommand("pnpm", installArgs, root, true);
					break;
				case "bun":
					installSuccess = await runCommand("bun", installArgs, root, true);
					break;
				default:
					installSuccess = await runCommand("npm", installArgs, root, true);
					break;
			}

			spinner.stop(
				installSuccess ? "Dependencies installed successfully" : "Failed to install dependencies",
			);
		}

		// Ask before initializing Git repository
		const shouldInitGit = await clack.select({
			message: "Initialize a Git repository?",
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
			],
		});

		if (clack.isCancel(shouldInitGit)) exitOnCancel();

		let gitInitSuccess = false;
		if (shouldInitGit === "yes") {
			// Initialize Git repository
			spinner.start("Initializing Git repository");
			gitInitSuccess = await runCommand("git", ["init"], root, true);
			spinner.stop(
				gitInitSuccess ? "Git repository initialized" : "Failed to initialize Git repository",
			);
		}

		// Display next steps
		const relativePath = path.relative(cwd, root);
		const displayPath = relativePath.includes(" ") ? `"${relativePath}"` : relativePath;

		const nextSteps = [];
		if (root !== cwd) {
			nextSteps.push(`cd ${displayPath}`);
		}

		switch (installCommand) {
			case "yarn":
				nextSteps.push("yarn dev");
				break;
			case "bun":
				nextSteps.push("bun dev");
				break;
			default:
				nextSteps.push(`${installCommand} run dev`);
				break;
		}

		clack.outro(
			`${green("✓")} Project created successfully!\n\nNext steps:\n${nextSteps
				.map((step) => `  ${step}`)
				.join("\n")}`,
		);
	} catch (error) {
		// Create a new spinner for cleanup
		const cleanupSpinner = clack.spinner();

		// Add cleanup of partially created project
		if (fs.existsSync(root) && !isEmpty(root)) {
			cleanupSpinner.start("Cleaning up failed installation");
			emptyDir(root);
			cleanupSpinner.stop("Cleaned up failed installation");
		}

		// Kill any remaining child processes
		for (const child of childProcesses) {
			if (!child.killed) {
				child.kill();
			}
		}

		clack.outro(`${red("✖")} Failed to scaffold project: ${error}
Try again with a different directory or recipe.`);
	}
}

main().catch((e) => {
	clack.outro(`${red("✖")} An unexpected error occurred: ${e}`);
});
