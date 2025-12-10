# Static Block Kit

A static site generator with block-based content management and a Vue-like template DSL.

## Quick Start

```bash
# Install dependencies
bun install

# Generate block render functions
bun run gen

# Start dev server
bun run dev

# Build for production
bun run build
```

## Project Structure

```
src/
├── core/                   # Core library
│   ├── layout.ts          # Layout enums (tone, density, etc.)
│   ├── schema-address.ts  # CMS editing addresses
│   ├── schema.ts          # CMS field → Zod schema transform
│   └── block-registry.ts  # Block definition & registry
├── cms-blocks.ts          # CMS schema definitions
├── blocks/                # Block implementations
│   ├── *.block.html      # Template files (Vue-like DSL)
│   ├── *.block.ts        # Block definitions
│   └── gen/              # Generated render functions (git-ignored)
├── rendering/
│   └── html-renderer.ts   # Page rendering engine
├── site/
│   └── pages/            # Page templates & configs
│       ├── base.html     # HTML template with regions
│       ├── *.page.ts     # Page configurations
│       └── index.ts      # Page exports
└── assets/
    ├── styles.css        # Site design system
    └── client/           # Client-side JS
        ├── app.js        # Minimal runtime
        └── dev-overlay.js # Dev inspector

scripts/
├── dev.ts               # Development server
├── build.ts             # Production build
└── gen-blocks.ts        # Template compiler

dist/                    # Build output (git-ignored)
```

## Template DSL

Block templates use a Vue-like syntax:

```html
<!-- Interpolation (escaped) -->
<h1>{{ props.headline }}</h1>

<!-- Raw HTML (unescaped) -->
<div class="prose">{{{ props.body }}}</div>

<!-- Conditionals -->
<template v-if="props.eyebrow">
  <span class="eyebrow">{{ props.eyebrow }}</span>
</template>

<!-- Loops -->
<template v-for="item, i in props.items">
  <div class="item">{{ item.title }}</div>
</template>

<!-- Dynamic attributes -->
<a :href="props.link.href">{{ props.link.label }}</a>
```

Available context variables:

- `props` - Block props (validated)
- `ctx` - Render context (pageId, assetBase, isDev, layout)
- `addr` - Schema address for CMS editing
- `encodeSchemaAddress(addr)` - Helper to encode address

## Creating Blocks

1. Define CMS schema in `src/cms-blocks.ts`:

```typescript
export const cmsBlocks = {
  myBlock: {
    type: "myBlock",
    label: "My Block",
    fields: {
      title: { type: "text", label: "Title", required: true },
      content: { type: "richText", label: "Content", required: true },
    },
  },
};
```

2. Create template `src/blocks/my-block.block.html`:

```html
<section class="my-block" data-block-id="{{ addr.blockId }}">
  <h2>{{ props.title }}</h2>
  <div class="prose">{{{ props.content }}}</div>
</section>
```

3. Create definition `src/blocks/my-block.block.ts`:

```typescript
import { z } from "zod/v4";
import { defineBlock } from "../core/block-registry";
import { renderMyBlock } from "./gen/my-block.render";

export const myBlockPropsSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const myBlockBlock = defineBlock({
  type: "myBlock",
  propsSchema: myBlockPropsSchema,
  renderHtml: renderMyBlock,
});
```

4. Register in `src/blocks/index.ts` and run `bun run gen`

## Creating Pages

Add page configs in `src/site/pages/`:

```typescript
import type { PageConfig } from "../../rendering/html-renderer";

export const myPage: PageConfig = {
  id: "my-page",
  path: "/my-page",
  title: "My Page",
  template: "base.html",
  density: "comfortable",
  regions: {
    main: {
      blocks: [
        {
          id: "block-1",
          type: "myBlock",
          props: {
            title: "Hello World",
            content: "<p>Welcome!</p>",
          },
          layout: {
            tone: "surface",
            contentAlign: "center",
          },
        },
      ],
    },
  },
};
```

Then export from `src/site/pages/index.ts`.

## Layout Props

Blocks can receive layout styling hints:

- `tone`: surface | raised | accent | inverted
- `contentAlign`: left | center | split
- `density`: compact | comfortable | relaxed
- `contentWidth`: narrow | default | wide

## Dev Server Features

- Hot page rendering (save & refresh)
- Alt+click inspector for blocks
- API endpoints:
  - `/__pages` - List all pages
  - `/__site` - Full site config
  - `/__inspect?address=...` - Decode schema address

## Design System

The CSS in `src/assets/styles.css` provides:

- Design tokens (colors, spacing, typography)
- Layout primitives (container, grid, stack)
- Component styles (section, card, button)
- Tone modifiers (surface, raised, accent, inverted)
- Density-based spacing

Customize tokens in `:root` to match your brand.

## License

MIT
