import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(async () => {
  const { default: react } = await import("@vitejs/plugin-react");

  return {
    root: __dirname,
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "../src"),
      },
    },
    server: {
      port: 4400,
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});
