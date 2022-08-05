/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domain: ['images.unsplash.com'],
	},
};

// module.exports = nextConfig;

module.exports = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ['images.unsplash.com'],
	},
};
