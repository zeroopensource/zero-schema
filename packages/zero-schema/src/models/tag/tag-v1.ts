import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { RecordV1, RecordV1Input } from "../record/record-v1";

export const TagV1Metadata = z.strictObject({});

export const TagV1Input = RecordV1Input.extend({
  metadata: TagV1Metadata,
}).meta({
  description: "Tag Input Schema",
  title: "TagV1Input",
});
export type TagV1InputType = z.infer<typeof TagV1Input>;
export const TagV1InputSample: TagV1InputType = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  description: "This is the content of my tag.",
  metadata: {},
  name: "My Tag",
  tags: ["technology", "programming"],
  zeroId: generateZeroId(),
};

export const TagV1 = RecordV1.extend({
  metadata: TagV1Metadata,
}).meta({
  description: "Tag Schema",
  title: "TagV1",
});
export type TagV1Type = z.infer<typeof TagV1>;
export const TagV1Sample: TagV1Type = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  createdAt: new Date().toISOString(),
  description: "This is the content of my tag.",
  id: crypto.randomUUID(),
  metadata: {},
  name: "My Tag",
  tags: ["technology", "programming"],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
