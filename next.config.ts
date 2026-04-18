import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Turbopack picks the nearest lockfile as the workspace root; a `pnpm-lock.yaml`
// in a parent directory (e.g. the user home) can win over this repo. Pin the root.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
