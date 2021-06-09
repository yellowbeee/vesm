const path = require('path')

const pluginName = 'vesm-plugin-share'

module.exports = ({ exposes }) => {
  const cache = {}

  const tryResolve = (resolvePath) => {
    const tid = Object.keys(exposes).find(id => exposes[id].path.indexOf(resolvePath) >= 0)
    return tid ? exposes[tid] : undefined
  }


  return {
    name: pluginName,
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        if(args.kind === 'import-statement' && tryResolve(path.join(args.resolveDir, args.path))) {
          return {
            namespace: pluginName,
            path: args.path,
            pluginData: {
              resolveDir: args.resolveDir,
            }
          }
        }
      })

      build.onLoad({ filter: /.*/, namespace: pluginName }, args => {
        return {
          contents: `export { default } from '${tryResolve(path.join(args.pluginData.resolveDir, args.path)).modulePath}'`,
          resolveDir: './',
        }
      })
    }
  }
}