import { defineConfig } from "@static-block-kit/core";

export default defineConfig({
  blocksDir: "src/blocks",
  pagesDir: "src/site/pages",
  assetsDir: "src/assets",
  publicDir: "public",
  outDir: "dist",
  devPort: 3000,
});
