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
        let expose = tryResolve(path.join(args.resolveDir, args.path))
        if(args.kind === 'import-statement' && expose) {
          return {
            namespace: pluginName,
            path: expose.modulePath,
            external: true,
            pluginData: {
              resolveDir: args.resolveDir,
            }
          }
        }
      })
    }
  }
}