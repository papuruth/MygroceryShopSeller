module.exports = (api) => {
  api.cache(false);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['react-native-paper/babel'],
      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: './src',
          rootPathPrefix: '@/',
        },
      ],
    ],
  };
};
