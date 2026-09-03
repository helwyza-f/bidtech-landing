export function asset(path: string) {
  if (/^(https?:)?\/\//.test(path)) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

  if (!basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
