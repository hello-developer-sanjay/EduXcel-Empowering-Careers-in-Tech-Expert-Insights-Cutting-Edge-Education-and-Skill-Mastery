module.exports = {
    globDirectory: 'dist', // Your build output directory
    globPatterns: ['**/*.{html,js,css,png,jpg,svg,json}'],
    swDest: 'dist/sw.js', // Output service worker file
    clientsClaim: true,
    skipWaiting: true,
  };
  
