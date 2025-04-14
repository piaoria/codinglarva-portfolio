import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  serverExternalPackages: ["@notionhq/client"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "mazassumnida.wtf",
        port: "",
        pathname: "/api/v2/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "@notionhq/client": "commonjs @notionhq/client",
      });
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
