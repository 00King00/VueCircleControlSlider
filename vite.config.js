import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  const common = {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };

  if (!isLib) {
    return common;
  }

  return {
    ...common,
    publicDir: false,
    build: {
      lib: {
        entry: fileURLToPath(new URL("./src/index.js", import.meta.url)),
        name: "VueCircleControlSlider",
        fileName: (format) => {
          if (format === "es") return "VueCircleControlSlider.esm.js";
          if (format === "cjs") return "VueCircleControlSlider.common.js";
          if (format === "umd") return "VueCircleControlSlider.umd.js";
          return `VueCircleControlSlider.${format}.js`;
        },
        formats: ["es", "cjs", "umd"],
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return "VueCircleControlSlider.css";
            }
            return assetInfo.name;
          },
          exports: "named",
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
      emptyOutDir: true,
    },
  };
});
