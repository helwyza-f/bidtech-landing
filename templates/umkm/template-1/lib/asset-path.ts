const rawBasePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || '';
const basePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/$/, '');

export function assetPath(path: string) {
  if (!path.startsWith('/') || !basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  return `${basePath}${path}`;
}

export function cssUrl(path: string) {
  return `url("${assetPath(path).replace(/"/g, '\\"')}")`;
}
