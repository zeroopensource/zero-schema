import { z } from "zod";

export const BlogPostV1 = {
  id: z.string(),
  zeroId: z.string().optional(),
  name: z.string(),
  tags: z.array(z.string()).optional(),
  body: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
};

export const BlogPostV1Sample = {};
