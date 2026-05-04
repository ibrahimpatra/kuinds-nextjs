/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kuwaitindiadrivingschool.com',
  generateRobotsTxt: true,        // auto creates robots.txt too
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/admin/*', '/login'],   // hide admin pages from Google
  robotsTxtOptions: {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login'],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
    ],
  },
};