const path = require('path')
const merge = require('lodash/merge')
const VesmPluginShare = require('vesm-plugin-share')
const {resolveDir, resolveOutDir, resolvePackageJson, resolveVesmConfig} = require('../helper/paths')
const {flatIdDeps} = require('../helper/flatIdDeps')


module.exports = ({src}, userVesmConfig = {}) => {
  const config = userVesmConfig
  src = src || 'src/index.ts'
  src = path.join(resolveDir, src)
  // expose
  const idDeps = flatIdDeps(config.exposes || {})
  // 手机
  const entries = Object.keys(idDeps).map(dep => idDeps[dep].path)
  const externals = Object.keys(idDeps).map(dep => idDeps[dep].modulePath)

  config.esbuild = merge({
    entryPoints: [src, ...entries],
    // target: ['chrome50'],
    format: 'esm',
    treeShaking: true,
    bundle: true,
    splitting: true,
    external:[...externals],
    logLevel: 'info',
    // inject: [injectReact],
    loader: {
      '.tsx': 'tsx',
      '.ts': 'ts',
      '.css': 'css',
      '.js': 'jsx',
      '.svg': 'dataurl',
      '.png': 'dataurl',
    },
    // define: {global: 'window'},
    plugins: [VesmPluginShare({exposes: idDeps})],
  }, config.esbuild)

  return config
}