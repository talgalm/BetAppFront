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
    },
  },
};

//   '@components': resolve(__dirname, 'src/components'),
//   '@pages': resolve(__dirname, 'src/pages'),
//   '@utils': resolve(__dirname, 'src/utils'),
//   '@theme': resolve(__dirname, 'src/theme'),
//   '@connection': resolve(__dirname, 'src/connection'),
//   '@errors': resolve(__dirname, 'src/errors'),
//   '@interfaces': resolve(__dirname, 'src/interfaces'),
//   '@store': resolve(__dirname, 'src/store'),
//   '@language': resolve(__dirname, 'src/language'),
//   '@layout': resolve(__dirname, 'src/layout'),
//   '@providers': resolve(__dirname, 'src/providers'),
//   '@schemas': resolve(__dirname, 'src/schemas'),
//   '@types': resolve(__dirname, 'src/types'),
