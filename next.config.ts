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
      bodySizeLimit: "20mb",
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
    domains: [
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
      "prod-files-secure.s3.amazonaws.com",
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "@notionhq/client": "commonjs @notionhq/client",
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
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
