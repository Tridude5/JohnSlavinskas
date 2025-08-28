// next.config.mjs
const repo = 'JohnSlavinskas';

// On GitHub Actions (Pages build), use the repo as basePath.
// Locally (npm run dev) it's just '' so everything works.
const isPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isPages ? `/${repo}` : '';

export default {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  trailingSlash: true,
  // Also expose it to the client for <a href={`${base}/...`}> links
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
