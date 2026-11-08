import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { RecordV1 } from "../record/record-v1";

export const BlogPostV1Input = z
  .strictObject({
    body: z.string().optional(),
    id: z.string(),
    name: z.string(),
    tags: z.array(z.string()),
    zeroId: z.string().optional(),
  })
  .meta({
    description: "Blog Post Input Schema",
    title: "BlogPostV1Input",
    // examples: "",
    // id: "BlogPostV1",
  });

export const BlogPostV1 = RecordV1.extend({
  metadata: z.strictObject({}),
}).meta({
  description: "Blog Post Schema",
  title: "BlogPostV1",
  // examples: "",
  // id: "BlogPostV1",
});
export type BlogPostV1Type = z.infer<typeof BlogPostV1>;

export const BlogPostV1Sample: BlogPostV1Type = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  createdAt: new Date().toISOString(),
  description: "This is the content of my blog post.",
  id: crypto.randomUUID(),
  metadata: {},
  name: "My Blog Post",
  tags: ["technology", "programming"],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
