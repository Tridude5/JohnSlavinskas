// next.config.mjs
const repo = 'JohnSlavinskas'
const isPages = process.env.GITHUB_ACTIONS === 'true'
const basePath = isPages ? `/${repo}` : ''

export default {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  // Use basePath as-is (no extra slash) to avoid odd double-slash asset URLs
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}
