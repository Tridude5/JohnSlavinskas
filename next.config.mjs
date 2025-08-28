// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const repo = 'SandyKao';

export default {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '' }
};
