const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);


// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);
// const customConfig = {};

// // Merge default and custom Metro config
// const mergedConfig = mergeConfig(defaultConfig, customConfig);

// // Wrap with Reanimated Metro config
// module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
