const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "..");
const templatesRoot = path.join(repoRoot, "templates");
const demoRoot = path.join(repoRoot, "frontend", "public", "demo");

const demos = [
  ["automotive", "automotive/template-1"],
  ["beauty-wellness", "beauty-wellness/template-1"],
  ["restaurant-cafe", "restaurant-cafe/template-1"],
  ["restaurant-cafe-2", "restaurant-cafe/template-2"],
  ["organization", "organization/template-1"],
  ["community-pro", "organization/template-2"],
];

const shouldInstall = !process.argv.includes("--skip-install");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const nextBin = process.platform === "win32"
  ? path.join("node_modules", ".bin", "next.cmd")
  : path.join("node_modules", ".bin", "next");

function run(command, args, cwd, env = {}) {
  const isWindows = process.platform === "win32";
  const shellCommand = [command, ...args].map((arg) => `"${arg.replace(/"/g, '\\"')}"`).join(" ");
  const result = isWindows
    ? spawnSync(shellCommand, {
        cwd,
        env: { ...process.env, ...env },
        stdio: "inherit",
        shell: true,
      })
    : spawnSync(command, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: "inherit",
      shell: false,
      });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed in ${cwd}`);
  }
}

function assertInside(parent, target) {
  const relative = path.relative(parent, target);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside ${parent}: ${target}`);
  }
}

function copyDemo(outDir, targetDir) {
  assertInside(demoRoot, targetDir);
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(outDir, targetDir, { recursive: true });
}

fs.mkdirSync(demoRoot, { recursive: true });

for (const [name, relativeTemplatePath] of demos) {
  const templateDir = path.join(templatesRoot, relativeTemplatePath);
  const outDir = path.join(templateDir, "out");
  const targetDir = path.join(demoRoot, name);
  const packageJson = path.join(templateDir, "package.json");

  if (!fs.existsSync(packageJson)) {
    throw new Error(`Missing package.json for ${name}: ${packageJson}`);
  }

  console.log(`\n==> Building demo: ${name} (${relativeTemplatePath})`);

  if (shouldInstall) {
    run(npmCmd, ["install", "--no-audit", "--no-fund"], templateDir);
  }

  run(
    nextBin,
    ["build"],
    templateDir,
    {
      BUILD_STATIC_DEMO: "true",
      NEXT_PUBLIC_DEMO_BASE_PATH: `/demo/${name}`,
    },
  );

  if (!fs.existsSync(path.join(outDir, "index.html"))) {
    throw new Error(`Build completed, but no out/index.html found for ${name}`);
  }

  copyDemo(outDir, targetDir);
  console.log(`==> Copied ${outDir} -> ${targetDir}`);
}

console.log("\n==> All template demos are ready.");
