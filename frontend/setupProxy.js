const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://xcel-back.onrender.com',
      changeOrigin: true,
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://hello-back-0iam.onrender.com',
      changeOrigin: true,
    })
  );
};
