/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/lounge",
        destination: "https://linkylounge.com/",
        permanent: false,
      },
      // linkykorea.com 전체(애펙스·www) → 레이지클럽 (정본 www.lazy-club.com), 2026-08-15.
      // 구 목적지 linkylounge.com/lazyday 는 다시 레이지데이 북클럽으로 301 되던 2단 체인이라
      // 최종 착지가 북클럽이었다. 레이지클럽으로 직행하도록 교체.
      {
        source: "/:path*",
        destination: "https://www.lazy-club.com",
        permanent: true,
        has: [{ type: "host", value: "linkykorea.com" }],
      },
      {
        source: "/:path*",
        destination: "https://www.lazy-club.com",
        permanent: true,
        has: [{ type: "host", value: "www.linkykorea.com" }],
      },
    ]
  },
}

export default nextConfig
