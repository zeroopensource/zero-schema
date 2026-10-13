import { defineConfig } from "tsdown";

export default defineConfig({
  dts: {
    tsgo: true,
  },
  entry: "src/index.ts",
  exports: true,
  format: {
    cjs: {
      target: ["node20"],
    },
    esm: {
      target: ["es2015"],
    },
  },
});
