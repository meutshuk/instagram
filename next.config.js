/** @type {import('next').NextConfig} */

/**
 * Restart everytime you change file in this folder
 */
// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ["lh3.googleusercontent.com"],
//   },
// };

const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
});
// module.exports = nextConfig;
