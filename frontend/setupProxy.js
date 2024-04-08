const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://eduxcel-api3-j9a2.onrender.com',
      changeOrigin: true,
    })
  );
};
