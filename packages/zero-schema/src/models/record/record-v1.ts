import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { MetadataV1 } from "../metadata/metadata-v1";

export const RecordV1 = z.strictObject({
  ...MetadataV1.shape,
  id: z.string(),
  zeroId: z.string().optional(),
  name: z.string(),
  tags: z.array(z.string()),
});
export type RecordV1Type = z.infer<typeof RecordV1>;

export const RecordV1Sample: RecordV1Type = {
  id: crypto.randomUUID(),
  zeroId: generateZeroId(),
  name: "Zero",
  tags: [],
  updatedAt: new Date(),
  createdAt: new Date(),
};
