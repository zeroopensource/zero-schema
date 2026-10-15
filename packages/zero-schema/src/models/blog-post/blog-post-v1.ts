import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { MetadataV1 } from "../metadata/metadata-v1";

export const BlogPostV1 = z
  .strictObject({
    ...MetadataV1.shape,
    body: z.string().optional(),
    id: z.string(),
    name: z.string(),
    tags: z.array(z.string()),
    zeroId: z.string().optional(),
  })
  .meta({
    description: "Blog Post Schema",
    // examples: "",
    id: "BlogPostV1",
    title: "BlogPostV1",
  });
export type BlogPostV1Type = z.infer<typeof BlogPostV1>;

export const BlogPostV1Sample: BlogPostV1Type = {
  body: "This is the content of my blog post.",
  createdAt: new Date().toISOString(),
  id: crypto.randomUUID(),
  name: "My Blog Post",
  tags: ["technology", "programming"],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
