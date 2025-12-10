---
name: Static Block Kit Build
overview: Build a working static site template first (all schemas, blocks, compiler, renderer, dev server), then extract into a monorepo with packages/core, packages/cli, and packages/create-static-kit.
todos:
  - id: core-layout
    content: Create src/core/layout.ts - layout enums and layoutPropsSchema
    status: pending
  - id: core-schema-address
    content: Create src/core/schema-address.ts - encode/decode schema addresses
    status: pending
  - id: core-schema
    content: Create src/core/schema.ts - CMS field schema, createSchemaFromCmsBlocks()
    status: pending
  - id: core-block-registry
    content: Create src/core/block-registry.ts - defineBlock, RenderBlockInput types
    status: pending
  - id: cms-blocks
    content: Create src/cms-blocks.ts - define hero, featureGrid, latestPosts, textSection schemas
    status: pending
  - id: template-compiler
    content: Create scripts/gen-blocks.ts - parse5 compiler for *.block.html → gen/*.render.ts
    status: pending
  - id: block-templates
    content: Create src/blocks/*.block.html templates for all 4 block types
    status: pending
  - id: block-definitions
    content: Create src/blocks/*.block.ts definitions using defineBlock()
    status: pending
  - id: html-renderer
    content: Create src/rendering/html-renderer.ts - parse5-based page renderer
    status: pending
  - id: page-templates
    content: Create src/site/pages/*.html - page templates with data-region markers
    status: pending
  - id: page-configs
    content: Create src/site/pages/*.page.ts - validated PageConfigs
    status: pending
  - id: assets-css
    content: Create src/assets/styles.css - tokens + layout primitives
    status: pending
  - id: assets-js
    content: Create src/assets/client/app.js and dev-overlay.js
    status: pending
  - id: dev-server
    content: Create scripts/dev.ts - Bun.serve() dev server with all routes
    status: pending
  - id: build-pipeline
    content: Create scripts/build.ts - full build pipeline
    status: pending
  - id: monorepo-extract
    content: "Phase 2: Extract to packages/core, packages/cli, packages/create-static-kit"
    status: pending
---

# Static Block Kit - Full Build

## Phase 1: Working Site Template

Build a complete, working site in the root that demonstrates all features. This becomes the template for `static-block-kit init`.

### 1.1 Core Schemas (`src/core/`)

**`layout.ts`** - Layout enums and schema:

```typescript
export const toneEnum = z.enum(["surface", "raised", "accent", "inverted"]);
export const contentAlignEnum = z.enum(["left", "center", "split"]);
export const densityEnum = z.enum(["compact", "comfortable", "relaxed"]);
export const contentWidthEnum = z.enum(["narrow", "default", "wide"]);
export const layoutPropsSchema = z.object({ tone, contentAlign, density, contentWidth });
```

**`schema-address.ts`** - Schema address encoding/decoding:

```typescript
export const schemaAddressSchema = z.object({
  pageId: z.string(),
  region: z.string(),
  blockId: z.string(),
  propPath: z.string().optional(),
});
export function encodeSchemaAddress(addr: SchemaAddress): string;
export function decodeSchemaAddress(encoded: string): SchemaAddress;
```

**`schema.ts`** - CMS schema helpers:

- `cmsFieldSchema` - Zod schema for CMS field definitions
- `cmsBlockSchemaMap` - Zod schema for the CMS block schema map
- `createSchemaFromCmsBlocks()` - transforms CMS field definitions into runtime Zod schemas

**`block-registry.ts`** - Block definition types:

```typescript
export function defineBlock<T extends z.ZodType>(config: {
  type: string;
  propsSchema: T;
  renderHtml: (input: RenderBlockInput<T>) => string;
}): BlockDefinition<T>;
```

### 1.2 CMS Block Schemas (`src/cms-blocks.ts`)

Define 4 block types: `hero`, `featureGrid`, `latestPosts`, `textSection`

Each with CMS-style field definitions that get transformed to Zod schemas via `createSchemaFromCmsBlocks()`.

### 1.3 Block Templates (`src/blocks/`)

For each block:

- `*.block.html` - HTML template with Vue-like DSL
- `*.block.ts` - Block definition using `defineBlock()`
- `gen/*.render.ts` - Generated render functions (git-ignored)

**Template DSL** supports:

- `{{ expr }}` - interpolation (props.x, ctx.x, addr.x, item, i)
- `v-if="expr"` - conditional rendering
- `v-for="item, i in props.items"` - iteration (on `<template>` or elements)

### 1.4 Template Compiler (`scripts/gen-blocks.ts`)

Parse5-based compiler that:

1. Finds all `*.block.html` in `src/blocks/`
2. Parses each into AST
3. Walks AST, generating JS code:

   - Static nodes → `out += "..."`
   - `{{ expr }}` → `out += escapeHtml(expr)`
   - `v-if` → `if (expr) { ... }`
   - `v-for` → `for (const [i, item] of arr.entries()) { ... }`

4. Emits `gen/<block>.render.ts` files

### 1.5 Page System

**`src/site/pages/*.html`** - Page templates with `data-region` markers

**`src/site/pages/*.page.ts`** - PageConfig exports validated with `pageConfigSchema`

**`src/site/pages/index.ts`** - Exports array of all pages

**`src/rendering/html-renderer.ts`** - Parse5-based renderer:

- Load template HTML
- Parse to AST
- Update `<title>`, set `data-page-id`, `data-density`
- For each `data-region` node: render blocks, inject children
- Serialize back to HTML

### 1.6 Assets

**`src/assets/styles.css`** - Site-owned design system:

- CSS variables: colors, spacing, radii, shadows (site defines these)
- Typography classes: `.h1`, `.h2`, `.text-body`, `.eyebrow`
- Layout primitives: `.section`, `.container`, `.stack`, `.grid`, `.card`
- Tone modifiers: `.section--tone-*`
- Density-based spacing via `[data-density]` selectors
- All styling decisions are site-level, toolkit provides no base CSS

**`src/assets/client/app.js`** - Minimal ES5 enhancement runtime

**`src/assets/client/dev-overlay.js`** - Alt+click → schema address inspector

**`public/`** - Static assets directory:

- Images, fonts, favicons, etc.
- Copied verbatim to `dist/` during build
- Served directly in dev mode

### 1.7 Dev Server (`scripts/dev.ts`)

Bun.serve() with routes:

- `/` and page routes → rendered HTML with dev overlay injected
- `/styles.css`, `/app.js` → static assets
- `/__dev-overlay.js` → dev overlay script
- `/__pages` → page listing
- `/__site` → site config JSON
- `/__inspect?address=...` → decode schema address, return block info

### 1.8 Build Pipeline (`scripts/build.ts`)

1. Run `gen-blocks.ts` to compile templates
2. Load and validate all PageConfigs
3. Render each page to HTML (no dev overlay)
4. Copy assets to `dist/`
5. Write HTML files to `dist/`

---

## Phase 2: Monorepo Extraction

After Phase 1 works, restructure to:

```
packages/
  core/           # @static-block-kit/core
    src/
      schema.ts
      layout.ts
      schema-address.ts
      block-registry.ts
      cms-blocks.ts
      html-renderer.ts
      template-compiler.ts
  cli/            # static-block-kit (binary)
    src/
      commands/init.ts
      commands/dev.ts
      commands/build.ts
  create-static-kit/  # create-static-kit (npm init)
    template/         # the working site from Phase 1
```

The CLI imports from `@static-block-kit/core` and scaffolds projects from the template.

---

## File Structure (Phase 1)

```
src/
  core/
    schema.ts
    layout.ts
    schema-address.ts
    block-registry.ts
  cms-blocks.ts
  blocks/
    hero.block.html
    hero.block.ts
    feature-grid.block.html
    feature-grid.block.ts
    latest-posts.block.html
    latest-posts.block.ts
    text-section.block.html
    text-section.block.ts
    gen/                    # git-ignored
  rendering/
    html-renderer.ts
  site/
    pages/
      index.html
      about.html
      index.page.ts
      about.page.ts
      index.ts
  client/
    app.js
    dev-overlay.js
styles.css                  # site-level design system
public/                     # static assets (images, fonts, etc.)
scripts/
  dev.ts
  build.ts
  gen-blocks.ts
dist/                       # git-ignored
```