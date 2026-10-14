import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { MetadataV1 } from "../metadata/metadata-v1";

export const RecordV1 = z.strictObject({
  ...MetadataV1.shape,
  id: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  zeroId: z.string().optional(),
});
export type RecordV1Type = z.infer<typeof RecordV1>;

export const RecordV1Sample: RecordV1Type = {
  createdAt: new Date().toISOString(),
  id: crypto.randomUUID(),
  name: "Zero",
  tags: [],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
