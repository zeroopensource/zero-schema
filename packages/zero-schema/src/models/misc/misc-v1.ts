import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { MetadataV1 } from "../metadata/metadata-v1";

export const MiscV1 = z
  .strictObject({
    ...MetadataV1.shape,
    body: z.string().optional(),
    id: z.string(),
    name: z.string(),
    tags: z.array(z.string()),
    zeroId: z.string().optional(),
  })
  .meta({
    description: "Misc Schema",
    title: "MiscV1",
    // examples: "",
    // id: "MiscV1",
  });
export type MiscV1Type = z.infer<typeof MiscV1>;

export const MiscV1Sample: MiscV1Type = {
  body: "This is the content of my misc item.",
  createdAt: new Date().toISOString(),
  id: crypto.randomUUID(),
  name: "My Misc Item",
  tags: ["technology", "programming"],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
