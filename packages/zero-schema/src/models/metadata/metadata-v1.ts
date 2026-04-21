import { z } from "zod";

export const MetadataV1Select = z.strictObject({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MetadataV1Sample = {};
