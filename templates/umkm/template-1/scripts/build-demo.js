const { spawnSync } = require('node:child_process');

process.env.BUILD_STATIC_DEMO = 'true';
process.env.NEXT_PUBLIC_DEMO_BASE_PATH =
  process.env.NEXT_PUBLIC_DEMO_BASE_PATH || '/demo/umkm';

const result = spawnSync(
  process.execPath,
  [require.resolve('next/dist/bin/next'), 'build'],
  {
    stdio: 'inherit',
    env: process.env,
  }
);

process.exit(result.status ?? 1);
