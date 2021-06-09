const esbuild = require('esbuild')
const path = require('path')
const VesmPluginShare = require('vesm-plugin-share')
const {resolveDir, resolveOutDir, resolvePackageJson, resolveVesmConfig} = require('../helper/paths')
const {flatIdDeps} = require('../helper/flatIdDeps')
const {exposes} = require(resolveVesmConfig)()

module.exports = async ({src, port}) => {
  src = src || 'src/index.ts'
  src = path.join(resolveDir, src)
  // const outputPath = path.join(cliPath, 'template', 'public')
  port = port ? Number(port) : 8000
  // const hostname = getHostname()
  const idDeps = flatIdDeps(exposes)
  const entries = Object.keys(idDeps).map(dep => idDeps[dep].path)
  const externals = Object.keys(idDeps).map(dep => idDeps[dep].modulePath)
  esbuild
      .serve(
        {
          host:'0.0.0.0',
          servedir: path.resolve(__dirname, '../template/public'),
          port,
        },
        {
          entryPoints: [src, ...entries],
          // target: ['chrome50'],
          // outdir: outputPath,
          format: 'esm',
          treeShaking: true,
          bundle: true,
          splitting: true,
          external:[...externals],
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
        },
      )
      .then((server) => {
        console.log(`http://localhost:${port}`)
        // console.log(`http://${hostname}:${port}`)
        // Call "stop" on the web server when you're done
        // server.stop()
      })
  
}
