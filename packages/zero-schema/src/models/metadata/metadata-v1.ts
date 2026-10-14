import { z } from "zod";

export const MetadataV1 = z.strictObject({
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type MetadataV1Type = z.infer<typeof MetadataV1>;

export const MetadataV1Sample = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
