#!/usr/bin/env bun
/**
 * Create Static Kit - Project Scaffolder
 *
 * Usage:
 *   bunx create-static-kit my-site
 *   bunx create-static-kit .
 */

import { cp, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templateDir = join(__dirname, "..", "template");

const targetDir = process.argv[2] || ".";
const targetPath = join(process.cwd(), targetDir);

console.log(`\n🚀 Creating Static Kit project in ${targetPath}\n`);

// Create target directory if needed
await mkdir(targetPath, { recursive: true });

// Copy template
await cp(templateDir, targetPath, { recursive: true });

// Update package.json with target directory name
if (targetDir !== ".") {
  const packageJsonPath = join(targetPath, "package.json");
  const packageJson = await Bun.file(packageJsonPath).json();
  packageJson.name = targetDir.split("/").pop();
  await Bun.write(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
}

console.log(`✅ Done!

Next steps:
  ${targetDir !== "." ? `cd ${targetDir}` : ""}
  bun install
  bun run dev

Happy building! 🎉
`);
