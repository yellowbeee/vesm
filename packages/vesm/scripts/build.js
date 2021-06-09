const esbuild = require('esbuild')
// import fs from 'fs-extra'
const path = require('path')
// const exposes = require('../helper/expose')
const exposes = [path.join(process.cwd(), 'src/App.tsx')]

const plugin = (exposes) => ({
  name: 'moduleF',
  setup(build) {

    build.onResolve({ filter: /.*/ }, (args) => {
      if(args.kind === 'import-statement' && exposes.includes(path.resolve(args.resolveDir, args.path))) {
        return {
          namespace: 'moduleF',
          path: args.path,
          pluginData:  args.pluginData || {}
        }
      }
    })

    build.onLoad({ filter: /.*/, namespace: 'moduleF' }, args => {
      return {
        contents: `export { default } from './App.js'`,
        resolveDir: '.'
      }
    })
  }
})

module.exports = async ({src}) => {
  src = src || 'src/index.ts'
  src = path.join(process.cwd(), src)
  // rimraf.sync(outputPath)
  await esbuild.build({
      entryPoints: [path.join(process.cwd(), 'index.html'), ...exposes],
      // target: ['chrome50'],
      outdir: path.join(process.cwd(), 'dist'),
      format: 'esm',
      // treeShaking: true,
      bundle: true,
      splitting: true,
      external:['./App.js'],
      logLevel: 'info',
      metafile: true,
      // inject: [injectReact],
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.css': 'css',
        '.js': 'jsx',
        '.svg': 'dataurl',
        '.png': 'dataurl',
        '.html': 'default'
      },
      // define: {global: 'window'},
      plugins: [plugin(exposes)],
    
  })
  // copyPublicFolder({out: path.join(cliPath, 'template', 'public'), dist: outputPath, template, favicon})
}
