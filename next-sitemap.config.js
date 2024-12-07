/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://mylinks.com', // Replace with your site's URL
    generateRobotsTxt: true, // Generate robots.txt alongside sitemap.xml
    sitemapSize: 5000, // Limit entries per sitemap (useful for large sites)
    exclude: ['/dashboard/*', '/admin/*'], // Exclude specific paths
};

module.exports = config;
