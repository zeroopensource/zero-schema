import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { MetadataV1 } from "../metadata/metadata-v1";

export const BlogPostV1 = z.strictObject({
  ...MetadataV1.shape,
  id: z.string(),
  zeroId: z.string().optional(),
  name: z.string(),
  tags: z.array(z.string()),
  body: z.string().optional(),
});
export type BlogPostV1Type = z.infer<typeof BlogPostV1>;

export const BlogPostV1Sample: BlogPostV1Type = {
  id: crypto.randomUUID(),
  zeroId: generateZeroId(),
  name: "My Blog Post",
  tags: ["technology", "programming"],
  body: "This is the content of my blog post.",
  updatedAt: new Date(),
  createdAt: new Date(),
};
