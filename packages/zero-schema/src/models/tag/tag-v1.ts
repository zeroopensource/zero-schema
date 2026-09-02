import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { MetadataV1 } from "../metadata/metadata-v1";

export const TagV1 = z.strictObject({
  ...MetadataV1.shape,
  id: z.string(),
  zeroId: z.string().optional(),
  name: z.string(),
  tagSuggestions: z.array(z.string()),
  keywords: z.array(z.string()),
  description: z.string(),
});
export type TagV1Type = z.infer<typeof TagV1>;

export const TagV1Sample: TagV1Type = {
  id: crypto.randomUUID(),
  zeroId: generateZeroId(),
  name: "laptop",
  tagSuggestions: ["pc"],
  keywords: ["laptops", "computer", "computers", "pc"],
  description: "This is a sample tag.",
  updatedAt: new Date(),
  createdAt: new Date(),
};
