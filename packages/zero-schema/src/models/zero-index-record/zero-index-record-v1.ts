import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import { pgTableCreator, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { toZodV4SchemaTyped } from "@/lib/zod-utils";
import { generateZeroId } from "@zeroopensource/zero-id";

export const ZeroIndexRecordV1 = {
  id: text().primaryKey().default(sql`gen_random_uuid()`),
  zeroId: text()
    .$defaultFn(() => generateZeroId())
    .unique(),
  ownerId: text().notNull(),
  name: text().notNull(),
  tags: text().array(),
  versionId: text(),
  type: text(),
  data: text(),
  createdAt: timestamp("created_at", {
    withTimezone: false,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: false,
    mode: "date",
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const ZeroIndexRecordV1Sample = {};
