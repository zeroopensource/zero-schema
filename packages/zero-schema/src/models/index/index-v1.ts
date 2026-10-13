import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { MetadataV1 } from "../metadata/metadata-v1";

export const IndexV1 = z.strictObject({
  ...MetadataV1.shape,
  body: z.string().optional(),
  id: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  zeroId: z.string().optional(),
});
export type IndexV1Type = z.infer<typeof IndexV1>;

export const IndexV1Sample: IndexV1Type = {
  body: "This is the content of my blog post.",
  createdAt: new Date(),
  id: crypto.randomUUID(),
  name: "My Blog Post",
  tags: ["technology", "programming"],
  updatedAt: new Date(),
  zeroId: generateZeroId(),
};
