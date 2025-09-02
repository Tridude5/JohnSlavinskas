
Drop these into your Next.js `/public` folder and add this to `app/layout.tsx` metadata:

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)', type: 'image/svg+xml' },
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: light)', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32' },
      { url: '/favicon-16.png', sizes: '16x16' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#0ea5e9' }],
  },
};

(Or for Pages Router, add the corresponding <link> tags in <Head>.)

Files included:
- favicon.ico  (16–256)
- favicon-dark.svg, favicon-light.svg
- favicon-32.png, favicon-16.png
- icon-192.png, icon-512.png
- apple-touch-icon.png
- safari-pinned-tab.svg
- manifest.json (optional)
