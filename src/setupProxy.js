const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://51.79.145.101:9092/dancing',
      // target: 'http://localhost:9092/dancing',
      changeOrigin: true,
      pathRewrite: {
        [`^/api`]: ''
        },
    })
  );
};