
const VesmPluginStream = require('vesm-plugin-stream')
const {resolveOutDir} = require('../helper/paths')

module.exports = (processArgs, config) => {
  config.esbuild.plugins.push(VesmPluginStream())
  config.esbuild.outdir = resolveOutDir
  return config
}