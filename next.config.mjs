// next.config.mjs
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default {
  output: 'export',
  images: { unoptimized: true },      // needed for static export
  basePath,                           // e.g. "/JohnSlavinskas" on GitHub Pages
  assetPrefix: basePath ? `${basePath}/` : '',
  trailingSlash: true,
};
