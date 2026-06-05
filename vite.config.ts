import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";
import * as path from "path";

// Library build config. `npm run build:lib` produces dist/ (ESM + CJS + .d.ts).
// CRA (react-scripts) still handles `npm start` / `npm run build` for the demo.
export default defineConfig({
  plugins: [
    // Use the classic JSX runtime (React.createElement) instead of the automatic
    // runtime. The automatic runtime emits `import 'react/jsx-runtime'`, a subpath
    // that some consumer bundlers/older setups fail to resolve ("Can't resolve
    // 'react/jsx-runtime'"). Classic only needs the plain `react` import.
    react({ jsxRuntime: "classic" }),
    // Emit a single bundled .d.ts for the public entry.
    dts({ include: ["src/lib.tsx", "src/widget/**", "src/custom.d.ts"], rollupTypes: true }),
    // Inject the bundled CSS into the JS so consumers don't import a separate file.
    cssInjectedByJs(),
  ],
  // Don't copy the CRA `public/` folder (favicon, index.html, …) into the library dist.
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib.tsx"),
      name: "ForecastWidget",
      formats: ["es", "cjs"],
      fileName: (format) => `forecast-widget.${format === "es" ? "mjs" : "cjs"}`,
    },
    // Inline every PNG/JPG as a base64 data URI so the package works with zero
    // asset-loader config on the consumer side. (Raise this if assets grow.)
    assetsInlineLimit: 100 * 1024 * 1024,
    rollupOptions: {
      // Don't bundle React — consumers provide it (see peerDependencies).
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
