import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { RecordV1, RecordV1Input } from "../record/record-v1";

export const IndexV1Metadata = z.strictObject({});

export const IndexV1Input = RecordV1Input.extend({
  metadata: IndexV1Metadata,
}).meta({
  description: "Index Input Schema",
  title: "IndexV1Input",
});
export type IndexV1InputType = z.infer<typeof IndexV1Input>;
export const IndexV1InputSample: IndexV1InputType = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  description: "This is the content of my Index.",
  metadata: {},
  name: "My Index",
  tags: ["technology", "programming"],
  zeroId: generateZeroId(),
};

export const IndexV1 = RecordV1.extend({
  metadata: IndexV1Metadata,
}).meta({
  description: "Index Schema",
  title: "IndexV1",
});
export type IndexV1Type = z.infer<typeof IndexV1>;
export const IndexV1Sample: IndexV1Type = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  createdAt: new Date().toISOString(),
  description: "This is the content of my Index.",
  id: crypto.randomUUID(),
  metadata: {},
  name: "My Index",
  tags: ["technology", "programming"],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
