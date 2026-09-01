module.exports = function demoImageLoader({ src }) {
  if (/^https?:\/\//.test(src)) {
    return src;
  }

  const basePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";
  return `${basePath}${src}`;
};
