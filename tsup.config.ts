import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    icons: "src/icons.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: false,
  clean: true,
  minify: true,
  external: ["react", "react-dom"],
  injectStyle: true,
});
