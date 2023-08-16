module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "~": ["./"],
            "~src": ["./src"],
            "~assets": ["./assets"],
            "~slices": ["./slices"],
            "~components": ["./src/components"],
            "~utils": ["./src/utils"],
            "~screens": ["./src/screens"],
            "~navigation": ["./src/navigation"],
          },
        },
      ],
    ],
  };
};
