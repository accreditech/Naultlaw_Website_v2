import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv();

const [, , command, targetArg, ...extraArgs] = process.argv;
const target = targetArg ?? "preview";

const targetConfig = {
  preview: {
    envVar: "DATABASE_URL",
  },
  production: {
    envVar: "DATABASE_URL_PRODUCTION",
  },
};

function printUsage() {
  console.error(
    [
      "Usage: node scripts/run-drizzle.mjs <command> <preview|production> [...args]",
      "",
      "Examples:",
      "  node scripts/run-drizzle.mjs push preview",
      "  node scripts/run-drizzle.mjs push production --force",
      "  node scripts/run-drizzle.mjs studio preview",
    ].join("\n")
  );
}

if (!command || !(target in targetConfig)) {
  printUsage();
  process.exit(1);
}

const { envVar } = targetConfig[target];
const selectedUrl = process.env[envVar];

if (!selectedUrl) {
  console.error(
    `Missing database URL for ${target}. Set ${envVar} in .env.local.`
  );
  process.exit(1);
}

process.env.DATABASE_URL = selectedUrl;
process.env.DATABASE_TARGET = target;

const drizzleBin = resolve(
  "node_modules",
  ".bin",
  process.platform === "win32" ? "drizzle-kit.cmd" : "drizzle-kit"
);

console.log(
  `Running drizzle-kit ${command} against the ${target} database using ${envVar}.`
);

const result = spawnSync(drizzleBin, [command, ...extraArgs], {
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
