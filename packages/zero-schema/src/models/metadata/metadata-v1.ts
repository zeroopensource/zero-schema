import { z } from "zod";

export const MetadataV1 = z.strictObject({
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type MetadataV1Type = z.infer<typeof MetadataV1>;

export const MetadataV1Sample = {
  createdAt: new Date(),
  updatedAt: new Date(),
};
