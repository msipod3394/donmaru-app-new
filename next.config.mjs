/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  //pageExtensionsを追加
  pageExtensions: ['page.tsx', 'page.ts'],

  // styled-components 初期表示崩れ対策
  compiler: {
    styledComponents: true,
  },

  // ビルドエラーを無視する
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
