// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@connection': path.resolve(__dirname, 'src/connection'),
      '@errors': path.resolve(__dirname, 'src/errors'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@schemas': path.resolve(__dirname, 'src/schemas'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
};
