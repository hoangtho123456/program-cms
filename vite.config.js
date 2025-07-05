import path from "path";
import { defineConfig, loadEnv } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    base: process.env.VITE_BASE_URL || "/",
    resolve: {
      alias: {
        "@": `${path.resolve(__dirname, "src")}`,
        "~": `${path.resolve(__dirname, "node_modules")}`
      },
      dedupe: ["vue-demi"],
    },
    build: {
      minify: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    plugins: [createVuePlugin(), WindiCSS()],
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  };
});
