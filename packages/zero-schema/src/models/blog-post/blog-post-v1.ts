import { z } from "zod";
import { MetadataV1Schema } from "../metadata/metadata-v1";

export const BlogPostV1Schema = z.strictObject({
  ...MetadataV1Schema.shape,
  id: z.string(),
  zeroId: z.string().optional(),
  name: z.string(),
  tags: z.array(z.string()),
  body: z.string().optional(),
});

export const BlogPostV1Sample = {};
