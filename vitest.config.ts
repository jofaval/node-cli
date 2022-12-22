import { configDefaults, defineConfig } from "vitest/config";
import path from "path";

// https://stackoverflow.com/questions/74088103/vitest-how-to-exclude-specific-files-and-folders
export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      "**/core/templates/**",
      "**/examples/**",
    ],
  },
});
