import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { MetadataV1 } from "../metadata/metadata-v1";

export const ZeroV1 = z
  .strictObject({
    ...MetadataV1.shape,
    body: z.string().optional(),
    id: z.string(),
    name: z.string(),
    tags: z.array(z.string()),
    zeroId: z.string().optional(),
  })
  .meta({
    description: "Zero Schema",
    title: "ZeroV1",
    // examples: "",
    // id: "ZeroV1",
  });
export type ZeroV1Type = z.infer<typeof ZeroV1>;

export const ZeroV1Sample: ZeroV1Type = {
  body: "This is the content of my blog post.",
  createdAt: new Date().toISOString(),
  id: crypto.randomUUID(),
  name: "My Blog Post",
  tags: ["technology", "programming"],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
