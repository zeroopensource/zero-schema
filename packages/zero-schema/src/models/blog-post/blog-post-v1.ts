import { z } from "zod";
import { MetadataV1Select } from "../metadata/metadata-v1";

export const BlogPostV1Select = z.strictObject({
  ...MetadataV1Select.shape,
  id: z.string(),
  zeroId: z.string().optional(),
  name: z.string(),
  tags: z.array(z.string()),
  body: z.string().optional(),
});
export type BlogPostV1SelectType = z.infer<typeof BlogPostV1Select>;

export const BlogPostV1Insert = BlogPostV1Select.omit({
  createdAt: true,
  updatedAt: true,
});
export type BlogPostV1InsertType = z.infer<typeof BlogPostV1Insert>;

export const BlogPostV1SampleInsert: BlogPostV1InsertType = {
  id: "123",
  zeroId: "456",
  name: "My Blog Post",
  tags: ["technology", "programming"],
  body: "This is the content of my blog post.",
};

export const BlogPostV1SampleSelect: BlogPostV1SelectType = {
  id: "123",
  zeroId: "456",
  name: "My Blog Post",
  tags: ["technology", "programming"],
  body: "This is the content of my blog post.",
  updatedAt: new Date(),
  createdAt: new Date(),
};
