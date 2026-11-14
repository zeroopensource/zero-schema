/** biome-ignore-all lint/performance/noBarrelFile: <explanation> */

import { BlogPostV1, BlogPostV1Input } from "./models/blog-post/blog-post-v1";
import { IndexV1, IndexV1Input } from "./models/index/index-v1";
import { MiscV1, MiscV1Input } from "./models/misc/misc-v1";
import { RecordV1,RecordV1Input } from "./models/record/record-v1";
import { TagV1, TagV1Input } from "./models/tag/tag-v1";

export const schemas = { 
  BlogPostV1, 
  BlogPostV1Input, 
  IndexV1, 
  IndexV1Input, 
  MiscV1, 
  MiscV1Input, 
  RecordV1, 
  RecordV1Input, 
  TagV1, 
  TagV1Input 
};

export * from "./models/blog-post/blog-post-v1";
export * from "./models/index/index-v1";
export * from "./models/misc/misc-v1";
export * from "./models/record/record-v1";
export * from "./models/tag/tag-v1";
