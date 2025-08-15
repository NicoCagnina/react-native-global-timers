const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '..');

const config = getDefaultConfig(projectRoot);

// Add the workspace root to the watchFolders
config.watchFolders = [workspaceRoot];

// Add the parent node_modules to the resolver paths
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Enable package exports
config.resolver.unstable_enablePackageExports = true;

module.exports = config;