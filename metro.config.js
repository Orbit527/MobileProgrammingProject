const { getDefaultConfig } = require("expo/metro-config");

// Learn more https://docs.expo.io/guides/customizing-metro
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
