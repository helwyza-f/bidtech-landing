const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");

const repoRoot = path.resolve(__dirname, "..");
const demoRoot = path.join(repoRoot, "frontend", "public", "demo");

const expectedDemos = [
  "automotive",
  "beauty-wellness",
  "beauty-wellness-2",
  "e-commerce",
  "restaurant-cafe",
  "restaurant-cafe-2",
  "organization",
  "community-pro",
  "property",
  "smartbelajar",
  "nivoraacademy",
  "aliansi-kepemimpinan-indonesia",
  "tehin",
  "agak-rapi",
];

// CLI options
const args = process.argv.slice(2);
const serverUrlArg = args.find((a) => a.startsWith("--server="))?.split("=")[1] || process.env.TEST_SERVER_URL;

console.log("==========================================");
console.log("   BIDTECH DEMO INTEGRITY & 404 AUDITOR   ");
console.log("==========================================\n");

let totalErrors = 0;
let totalWarnings = 0;

// 1. FILESYSTEM INTEGRITY CHECK
console.log("[1/2] Checking File System Integrity & Static Assets...\n");

if (!fs.existsSync(demoRoot)) {
  console.error(`❌ ERROR: Demo root directory does not exist: ${demoRoot}`);
  console.error("   Run 'npm run demos:build' first before running tests.\n");
  process.exit(1);
}

for (const demoName of expectedDemos) {
  const demoDir = path.join(demoRoot, demoName);
  const indexPath = path.join(demoDir, "index.html");

  if (!fs.existsSync(demoDir)) {
    console.error(`❌ [${demoName}] Missing directory: ${demoDir}`);
    totalErrors++;
    continue;
  }

  if (!fs.existsSync(indexPath)) {
    console.error(`❌ [${demoName}] Missing index.html: ${indexPath}`);
    totalErrors++;
    continue;
  }

  console.log(`✓ [${demoName}] index.html found.`);

  // Scan index.html for asset references
  const htmlContent = fs.readFileSync(indexPath, "utf8");

  // Regex to extract src and href attributes, plus url() references
  const assetRegex = /(?:src|href)=["']([^"']+)["']|url\(["']?([^"'\)]+)["']\)/g;
  let match;
  const referencedAssets = new Set();

  while ((match = assetRegex.exec(htmlContent)) !== null) {
    const assetUrl = match[1] || match[2];
    if (
      assetUrl &&
      !assetUrl.startsWith("http://") &&
      !assetUrl.startsWith("https://") &&
      !assetUrl.startsWith("data:") &&
      !assetUrl.startsWith("mailto:") &&
      !assetUrl.startsWith("tel:") &&
      !assetUrl.startsWith("javascript:") &&
      !assetUrl.startsWith("#")
    ) {
      referencedAssets.add(assetUrl);
    }
  }

  let missingCount = 0;
  for (const assetPath of referencedAssets) {
    // Resolve asset location
    let targetFilePath;
    if (assetPath.startsWith(`/demo/${demoName}/`)) {
      const relative = assetPath.replace(`/demo/${demoName}/`, "");
      targetFilePath = path.join(demoDir, relative);
    } else if (assetPath.startsWith("/demo/")) {
      targetFilePath = path.join(repoRoot, "frontend", "public", assetPath);
    } else if (assetPath.startsWith("/")) {
      targetFilePath = path.join(demoDir, assetPath);
    } else {
      targetFilePath = path.join(demoDir, assetPath);
    }

    // Ignore query strings/hashes in file check
    const cleanPath = targetFilePath.split("?")[0].split("#")[0];

    // Check if cleanPath exists or if it's an HTML route (folder with index.html or .html)
    const exists =
      fs.existsSync(cleanPath) ||
      fs.existsSync(`${cleanPath}.html`) ||
      fs.existsSync(path.join(cleanPath, "index.html"));

    if (!exists) {
      // Also check frontend/public root as fallback
      const publicFallback = path.join(repoRoot, "frontend", "public", assetPath.replace(/^\/demo\/[^\/]+\//, "")).split("?")[0].split("#")[0];
      const fallbackExists =
        fs.existsSync(publicFallback) ||
        fs.existsSync(`${publicFallback}.html`) ||
        fs.existsSync(path.join(publicFallback, "index.html"));

      if (!fallbackExists) {
        console.warn(`   ⚠️ [${demoName}] 404 Media/Asset missing on disk: ${assetPath}`);
        missingCount++;
        totalWarnings++;
      }
    }
  }

  if (missingCount === 0) {
    console.log(`   ✓ All ${referencedAssets.size} referenced local assets verified on disk.`);
  } else {
    console.warn(`   ⚠️ Found ${missingCount} potential missing asset(s) for ${demoName}.`);
  }
}

// 2. LIVE HTTP SERVER AUDIT (IF SERVER URL PROVIDED)
if (serverUrlArg) {
  console.log(`\n[2/2] Checking Live Server Responses on ${serverUrlArg}...\n`);

  function checkUrl(urlStr) {
    return new Promise((resolve) => {
      const client = urlStr.startsWith("https") ? https : http;
      const req = client.get(urlStr, { timeout: 5000 }, (res) => {
        resolve({ statusCode: res.statusCode, url: urlStr });
      });
      req.on("error", (err) => {
        resolve({ statusCode: 0, url: urlStr, error: err.message });
      });
      req.on("timeout", () => {
        req.destroy();
        resolve({ statusCode: 408, url: urlStr, error: "Timeout" });
      });
    });
  }

  async function runLiveAudit() {
    for (const demoName of expectedDemos) {
      const demoUrl = `${serverUrlArg.replace(/\/$/, "")}/demo/${demoName}`;
      const res = await checkUrl(demoUrl);
      if (res.statusCode === 200) {
        console.log(`✓ [LIVE 200 OK] ${demoUrl}`);
      } else {
        console.error(`❌ [LIVE ${res.statusCode || "ERR"}] ${demoUrl} ${res.error ? `(${res.error})` : ""}`);
        totalErrors++;
      }
    }

    finishReport();
  }

  runLiveAudit();
} else {
  console.log("\nℹ️ Live server audit skipped (no --server=<URL> argument passed).");
  console.log("  To test live server endpoints e.g. http://localhost:3000 or http://212.85.26.8:3010, run:");
  console.log("  node scripts/test-demos.js --server=http://localhost:3000\n");
  finishReport();
}

function finishReport() {
  console.log("==========================================");
  console.log(`SUMMARY: ${totalErrors} Error(s), ${totalWarnings} Warning(s)`);
  console.log("==========================================\n");

  if (totalErrors > 0) {
    console.error("❌ Demo test suite FAILED.");
    process.exit(1);
  } else {
    console.log("✅ Demo test suite PASSED successfully.");
    process.exit(0);
  }
}
