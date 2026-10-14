/** biome-ignore-all lint/performance/noBarrelFile: <explanation> */

import { BlogPostV1 } from "./models/blog-post/blog-post-v1";
import { IndexV1 } from "./models/index/index-v1";
import { MetadataV1 } from "./models/metadata/metadata-v1";
import { RecordV1 } from "./models/record/record-v1";

export const schemas = [BlogPostV1, IndexV1, MetadataV1, RecordV1];

export * from "./models/blog-post/blog-post-v1";
export * from "./models/index/index-v1";
export * from "./models/metadata/metadata-v1";
export * from "./models/record/record-v1";
