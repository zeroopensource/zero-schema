/** biome-ignore-all lint/performance/noBarrelFile: <explanation> */

import { BlogPostV1 } from "./models/blog-post/blog-post-v1";
import { IndexV1 } from "./models/index/index-v1";
import { MiscV1 } from "./models/misc/misc-v1";
import { RecordV1 } from "./models/record/record-v1";
import { TagV1 } from "./models/tag/tag-v1";

export const schemas = { BlogPostV1, IndexV1, MiscV1, RecordV1, TagV1 };

export * from "./models/blog-post/blog-post-v1";
export * from "./models/index/index-v1";
export * from "./models/misc/misc-v1";
export * from "./models/record/record-v1";
export * from "./models/tag/tag-v1";
