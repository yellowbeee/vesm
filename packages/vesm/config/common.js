import path from 'path'
import merge from 'lodash/merge.js'
import VesmPluginShare from 'vesm-plugin-share'
import babel from 'esbuild-plugin-babel'
import {resolveDir, resolveOutDir, resolvePackageJson, resolveVesmConfig} from '../helper/paths.js'
import {flatIdDeps} from '../helper/flatIdDeps.js'


export default function({src}, userVesmConfig = {}) {
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
      '.jsx': 'jsx',
      '.ts': 'ts',
      '.css': 'css',
      '.js': 'jsx',
      '.svg': 'dataurl',
      '.png': 'dataurl',
    },
    // define: {global: 'window'},
    plugins: [babel({
      config: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
          ['react-refresh/babel', { skipEnvCheck: true }]
        ]
      }
    }), VesmPluginShare({exposes: idDeps})],
  }, config.esbuild)

  return config
}