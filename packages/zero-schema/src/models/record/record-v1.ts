import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";

export const RecordV1 = z
  .strictObject({
    $schema: z.string(),
    createdAt: z.iso.datetime(),
    description: z.string().optional(),
    id: z.string(),
    name: z.string(),
    tags: z.array(z.string()),
    updatedAt: z.iso.datetime(),
    zeroId: z.string().optional(),
  })
  .meta({
    description: "Record Schema",
    title: "RecordV1",
    // examples: "",
    // id: "RecordV1",
  });
export type RecordV1Type = z.infer<typeof RecordV1>;

export const RecordV1Sample: RecordV1Type = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  createdAt: new Date().toISOString(),
  id: crypto.randomUUID(),
  name: "Zero",
  tags: [],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
