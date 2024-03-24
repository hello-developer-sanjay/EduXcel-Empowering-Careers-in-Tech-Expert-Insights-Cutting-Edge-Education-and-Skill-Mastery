const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://eduxcel-api3.onrender.com',
      changeOrigin: true,
    })
  );
};
