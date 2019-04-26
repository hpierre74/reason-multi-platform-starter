module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true
      }
    ],
    "@babel/plugin-syntax-dynamic-import",
    [
      "babel-plugin-styled-components",
      {
        ssr: false,
        displayName: true,
        pure: true
      }
    ],
    [
      "babel-plugin-named-asset-import",
      {
        loaderMap: {
          svg: {
            ReactComponent: "@svgr/webpack?-prettier,-svgo![path]"
          }
        }
      }
    ]
  ]
};
