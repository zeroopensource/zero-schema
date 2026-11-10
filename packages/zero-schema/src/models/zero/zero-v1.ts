import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { RecordV1, RecordV1Input } from "../record/record-v1";

export const ZeroV1Metadata = z.strictObject({});

export const ZeroV1Input = RecordV1Input.extend({
  metadata: ZeroV1Metadata,
}).meta({
  description: "Zero Input Schema",
  title: "ZeroV1Input",
});
export type ZeroV1InputType = z.infer<typeof ZeroV1Input>;
export const ZeroV1InputSample: ZeroV1InputType = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  description: "This is the content of my Zero.",
  metadata: {},
  name: "My Zero",
  tags: ["technology", "programming"],
  zeroId: generateZeroId(),
};

export const ZeroV1 = RecordV1.extend({
  metadata: ZeroV1Metadata,
}).meta({
  description: "Zero Schema",
  title: "ZeroV1",
});
export type ZeroV1Type = z.infer<typeof ZeroV1>;
export const ZeroV1Sample: ZeroV1Type = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  createdAt: new Date().toISOString(),
  description: "This is the content of my Zero.",
  id: crypto.randomUUID(),
  metadata: {},
  name: "My Zero",
  tags: ["technology", "programming"],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};
