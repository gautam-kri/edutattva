/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> produces a portable ./out folder with no server dependency.
  output: "export",
  // next/image optimization needs a server; disable so placeholders/assets work on static hosts.
  images: { unoptimized: true },
  // Emit /about/index.html style routes so the export serves cleanly from any static host.
  trailingSlash: true,
};

export default nextConfig;
