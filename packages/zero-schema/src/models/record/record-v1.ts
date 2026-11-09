import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";

export const RecordV1Input = z
  .strictObject({
    $schema: z.string(),
    description: z.string().optional(),
    name: z.string(),
    tags: z.array(z.string()),
    zeroId: z.string().optional(),
  })
  .meta({
    description: "Record Schema",
    title: "RecordV1",
  });
export type RecordV1InputType = z.infer<typeof RecordV1Input>;
export const RecordV1InputSample: RecordV1InputType = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-input-schema.json",
  description: "A sample record",
  name: "Zero",
  tags: [],
  zeroId: generateZeroId(),
};

export const RecordV1 = RecordV1Input.extend({
  createdAt: z.iso.datetime(),
  id: z.string(),
  updatedAt: z.iso.datetime(),
}).meta({
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
  description: "A sample record",
  id: crypto.randomUUID(),
  name: "Zero",
  tags: [],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
