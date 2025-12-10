#!/usr/bin/env bun
/**
 * Static Kit - Build Pipeline
 *
 * 1. Run template compiler (gen-blocks)
 * 2. Load and validate all page configs
 * 3. Render each page to HTML (no dev overlay)
 * 4. Copy assets to dist/
 * 5. Write HTML files to dist/
 */

import { mkdir, rm, cp } from "node:fs/promises";
import { join, dirname } from "node:path";
import { Glob } from "bun";
import {
  renderPage,
  compileBlockTemplates,
  type PageConfig,
} from "@static-block-kit/core";
import { loadConfig, resolvePath } from "../config-loader.ts";

const cwd = process.cwd();
const config = await loadConfig(cwd);

const blocksDir = resolvePath(config, "blocksDir", cwd);
const pagesDir = resolvePath(config, "pagesDir", cwd);
const assetsDir = resolvePath(config, "assetsDir", cwd);
const publicDir = resolvePath(config, "publicDir", cwd);
const outDir = resolvePath(config, "outDir", cwd);

async function build() {
  console.log("🔨 Building static site...\n");

  // Clean dist directory
  console.log("Cleaning output directory...");
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  // Step 1: Compile templates
  console.log("\n📝 Compiling block templates...");
  await compileBlockTemplates({
    blocksDir,
    genDir: join(blocksDir, "gen"),
  });

  // Step 2: Import fresh modules (after template compilation)
  const blocksModule = await import(join(blocksDir, "index.ts"));
  const pagesModule = await import(join(pagesDir, "index.ts"));

  // Register blocks
  if (typeof blocksModule.registerAllBlocks === "function") {
    blocksModule.registerAllBlocks();
  }

  const pages: PageConfig[] = pagesModule.pages;

  // Step 3: Render all pages
  console.log("\n📄 Rendering pages...");
  for (const page of pages) {
    const html = await renderPage(page, {
      templateDir: pagesDir,
      isDev: false,
      assetBase: "/",
    });

    // Determine output path
    const outPath =
      page.path === "/"
        ? join(outDir, "index.html")
        : join(outDir, page.path, "index.html");

    // Ensure directory exists
    await mkdir(dirname(outPath), { recursive: true });

    // Write HTML
    await Bun.write(outPath, html);
    console.log(`  ✓ ${page.path} → ${outPath}`);
  }

  // Step 4: Copy assets
  console.log("\n📦 Copying assets...");

  // CSS
  const cssPath = join(assetsDir, "styles.css");
  if (await Bun.file(cssPath).exists()) {
    await Bun.write(join(outDir, "styles.css"), await Bun.file(cssPath).text());
    console.log("  ✓ styles.css");
  }

  // JS
  const jsPath = join(assetsDir, "client/app.js");
  if (await Bun.file(jsPath).exists()) {
    await Bun.write(join(outDir, "app.js"), await Bun.file(jsPath).text());
    console.log("  ✓ app.js");
  }

  // Public directory (if exists)
  const publicDirFile = Bun.file(publicDir);
  try {
    const stat = await publicDirFile.stat();
    if (stat) {
      await cp(publicDir, outDir, { recursive: true });
      console.log("  ✓ public/");
    }
  } catch {
    // Public dir doesn't exist, that's fine
  }

  // Done
  console.log("\n✅ Build complete!");
  console.log(`   Output: ${outDir}/`);

  // List output files
  console.log("\n   Files:");
  const glob = new Glob("**/*");
  for await (const file of glob.scan(outDir)) {
    const stat = await Bun.file(join(outDir, file)).size;
    console.log(`   - ${file} (${formatBytes(stat)})`);
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
