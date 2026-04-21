import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { MetadataV1Select } from "../metadata/metadata-v1";

export const TagV1Select = z.strictObject({
  ...MetadataV1Select.shape,
  id: z.string(),
  zeroId: z.string().optional(),
  name: z.string(),
  tagSuggestions: z.array(z.string()),
  keywords: z.array(z.string()),
  description: z.string(),
});
export type TagV1SelectType = z.infer<typeof TagV1Select>;

export const TagV1Insert = TagV1Select.omit({
  createdAt: true,
  updatedAt: true,
});
export type TagV1InsertType = z.infer<typeof TagV1Insert>;

export const TagV1SampleInsert: TagV1InsertType = {
  id: crypto.randomUUID(),
  zeroId: generateZeroId(),
  name: "laptop",
  tagSuggestions: ["pc"],
  keywords: ["laptops", "computer", "computers", "pc"],
  description: "This is a sample tag.",
};

export const TagV1SampleSelect: TagV1SelectType = {
  id: crypto.randomUUID(),
  zeroId: generateZeroId(),
  name: "laptop",
  tagSuggestions: ["pc"],
  keywords: ["laptops", "computer", "computers", "pc"],
  description: "This is a sample tag.",
  updatedAt: new Date(),
  createdAt: new Date(),
};
