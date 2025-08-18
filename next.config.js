/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import "./src/env.js";
import path from "node:path";

/** @type {import("next").NextConfig} */
const config = {
  // ✅ Webpack (production builds / node server)
  webpack: (cfg) => {
    cfg.resolve.alias = {
      ...(cfg.resolve.alias ?? {}),
      "~": path.resolve(process.cwd(), "src"),
      "@": path.resolve(process.cwd(), "src"), // optional second alias
    };
    return cfg;
  },

  // ✅ Turbopack (next dev)
  experimental: {
    turbo: {
      resolveAlias: {
        "~": "./src",
        "@": "./src",
      },
    },
  },
};

export default config;
