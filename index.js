

(async function(){
  const {pluginUnpkg} = require('./packages/vesm-plugin-unpkg')
  const {
    startService,
    build,
  } = require("esbuild")
  // console.log(startService)
  // const service = await startService()

  try {
    const res = await build({
      entryPoints: ["./src/main.ts"],
      outfile: './dist/main.js',
      format: 'esm',
      // treeShaking: false,
      bundle: true,
      // splitting: false,
      // minify: true,
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.css': 'css',
        '.js': 'jsx',
        '.svg': 'dataurl',
        '.png': 'dataurl',
      },
      plugins: [pluginUnpkg]
    })
  } finally {
    // build.stop()
  }
})()  

