import { defineConfig } from "tsup";
import fs from "fs";
import path from "path";

const interfaceDir = path.resolve(__dirname, "src/interface");

const entries: Record<string, string> = {
  index: "src/index.ts",
};

// Add all subdirectories in src/interface as entry points
fs.readdirSync(interfaceDir).forEach((file) => {
  const fullPath = path.join(interfaceDir, file);
  if (fs.statSync(fullPath).isDirectory()) {
    if (fs.existsSync(path.join(fullPath, "index.ts"))) {
      entries[file] = `src/interface/${file}/index.ts`;
    }
  } else if (file.endsWith(".ts") && file !== "index.ts" && file !== "addAutoProps.ts") {
    const name = path.basename(file, ".ts");
    entries[name] = `src/interface/${file}`;
  }
});

export default defineConfig({
  entry: entries,
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
  },
  splitting: true,
  clean: true,
  minify: false,
  sourcemap: true,
  bundle: true,
  skipNodeModulesBundle: true,
  target: "es2022",
  outDir: "dist",
});
