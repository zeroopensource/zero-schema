import { generateZeroId } from "@zeroopensource/zero-id";
import { z } from "zod";
import { RecordV1, RecordV1Input } from "../record/record-v1";

export const MiscV1Metadata = z.strictObject({});

export const MiscV1Input = RecordV1Input.extend({
  metadata: MiscV1Metadata,
}).meta({
  description: "Misc Input Schema",
  title: "MiscV1Input",
});
export type MiscV1InputType = z.infer<typeof MiscV1Input>;
export const MiscV1InputSample: MiscV1InputType = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  description: "This is the content of my Misc.",
  metadata: {},
  name: "My Misc",
  tags: ["technology", "programming"],
  zeroId: generateZeroId(),
};

export const MiscV1 = RecordV1.extend({
  metadata: MiscV1Metadata,
}).meta({
  description: "Misc Schema",
  title: "MiscV1",
});
export type MiscV1Type = z.infer<typeof MiscV1>;
export const MiscV1Sample: MiscV1Type = {
  $schema:
    "https://zero-schema.zeroopensource.org/zero-schema/record-v1-schema.json",
  createdAt: new Date().toISOString(),
  description: "This is the content of my Misc.",
  id: crypto.randomUUID(),
  metadata: {},
  name: "My Misc",
  tags: ["technology", "programming"],
  updatedAt: new Date().toISOString(),
  zeroId: generateZeroId(),
};