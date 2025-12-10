import { z } from "zod/v4";

// CMS field type definitions
export const cmsFieldTypeEnum = z.enum([
  "text",
  "richText",
  "image",
  "link",
  "boolean",
  "select",
  "number",
  "array",
  "object",
]);

// Single CMS field definition
export const cmsFieldSchema: z.ZodType<CmsField> = z.lazy(() =>
  z.object({
    type: cmsFieldTypeEnum,
    label: z.string(),
    required: z.boolean().optional(),
    defaultValue: z.unknown().optional(),
    // For select fields
    options: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    // For array fields
    itemSchema: cmsFieldSchema.optional(),
    // For object fields
    fields: z.record(z.string(), cmsFieldSchema).optional(),
  })
);

export type CmsFieldType = z.infer<typeof cmsFieldTypeEnum>;

export interface CmsField {
  type: CmsFieldType;
  label: string;
  required?: boolean;
  defaultValue?: unknown;
  options?: { label: string; value: string }[];
  itemSchema?: CmsField;
  fields?: Record<string, CmsField>;
}

// Block schema definition for CMS
export interface CmsBlockSchema {
  type: string;
  label: string;
  fields: Record<string, CmsField>;
}

// Map of block type -> CMS schema
export const cmsBlockSchemaMapSchema = z.record(
  z.string(),
  z.object({
    type: z.string(),
    label: z.string(),
    fields: z.record(z.string(), cmsFieldSchema),
  })
);

export type CmsBlockSchemaMap = z.infer<typeof cmsBlockSchemaMapSchema>;

/**
 * Transform a CMS field definition into a runtime Zod schema
 */
function fieldToZod(field: CmsField): z.ZodType {
  let schema: z.ZodType;

  switch (field.type) {
    case "text":
      schema = z.string();
      break;
    case "richText":
      schema = z.string(); // HTML string
      break;
    case "image":
      schema = z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
      });
      break;
    case "link":
      schema = z.object({
        href: z.string(),
        label: z.string(),
        external: z.boolean().optional(),
      });
      break;
    case "boolean":
      schema = z.boolean();
      break;
    case "select":
      if (field.options && field.options.length > 0) {
        const values = field.options.map((o) => o.value) as [string, ...string[]];
        schema = z.enum(values);
      } else {
        schema = z.string();
      }
      break;
    case "number":
      schema = z.number();
      break;
    case "array":
      if (field.itemSchema) {
        schema = z.array(fieldToZod(field.itemSchema));
      } else {
        schema = z.array(z.unknown());
      }
      break;
    case "object":
      if (field.fields) {
        const shape: Record<string, z.ZodType> = {};
        for (const [key, subField] of Object.entries(field.fields)) {
          shape[key] = fieldToZod(subField);
        }
        schema = z.object(shape);
      } else {
        schema = z.record(z.string(), z.unknown());
      }
      break;
    default:
      schema = z.unknown();
  }

  // Apply required/optional
  if (!field.required) {
    schema = schema.optional();
  }

  // Apply default if present
  if (field.defaultValue !== undefined) {
    schema = (schema as z.ZodOptional<z.ZodType>).default(field.defaultValue as never);
  }

  return schema;
}

/**
 * Transform CMS block fields into a Zod object schema
 */
export function createSchemaFromCmsFields(
  fields: Record<string, CmsField>
): z.ZodObject<Record<string, z.ZodType>> {
  const shape: Record<string, z.ZodType> = {};
  for (const [key, field] of Object.entries(fields)) {
    shape[key] = fieldToZod(field);
  }
  return z.object(shape);
}

/**
 * Create runtime Zod schemas for all blocks from CMS definitions
 */
export function createSchemaFromCmsBlocks(
  blockSchemas: CmsBlockSchemaMap
): Record<string, z.ZodObject<Record<string, z.ZodType>>> {
  const result: Record<string, z.ZodObject<Record<string, z.ZodType>>> = {};
  for (const [blockType, blockSchema] of Object.entries(blockSchemas)) {
    result[blockType] = createSchemaFromCmsFields(blockSchema.fields);
  }
  return result;
}
