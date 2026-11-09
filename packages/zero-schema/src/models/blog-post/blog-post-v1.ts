import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { RecordV1, RecordV1Input } from "../record/record-v1";

export const BlogPostV1Metadata = z.strictObject({
  authors: z.array(z.string()),
  isListed: z.boolean(),
  isPublished: z.boolean(),
});

export const BlogPostV1Input = RecordV1Input.extend({
  metadata: BlogPostV1Metadata,
}).meta({
  description: "Blog Post Input Schema",
  title: "BlogPostV1Input",
});
export type BlogPostV1InputType = z.infer<typeof BlogPostV1Input>;
export const BlogPostV1InputSample: BlogPostV1InputType = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  description: "This is the content of my blog post.",
  metadata: {
    authors: [],
    isListed: true,
    isPublished: true,
  },
  name: "My Blog Post",
  tags: ["technology", "programming"],
  zeroId: generateZeroId(),
};

export const BlogPostV1 = RecordV1.extend({
  metadata: BlogPostV1Metadata,
}).meta({
  description: "Blog Post Schema",
  title: "BlogPostV1",
});
export type BlogPostV1Type = z.infer<typeof BlogPostV1>;
export const BlogPostV1Sample: BlogPostV1Type = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  createdAt: new Date().toISOString(),
  description: "This is the content of my blog post.",
  id: crypto.randomUUID(),
  metadata: {
    authors: [],
    isListed: true,
    isPublished: true,
  },
  name: "My Blog Post",
  tags: ["technology", "programming"],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
