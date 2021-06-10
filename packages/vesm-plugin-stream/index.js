const axios = require('axios')

const pluginName = 'vesm-plugin-stream'

const fetch = async (url) => {
  return (await axios.get(url)).data
}

module.exports = () => {
  const cache = {}

  return {
    name: pluginName,
    setup(build) {
      // http
      build.onResolve({ filter: /.*/ }, args => {
        if(args.path.startsWith('/') && /^https?:\/\/.*/.test(args.importer)) {
          const {origin} = new URL(args.importer)
          return {
            namespace: pluginName,
            path: origin + args.path,
          }
        }
        if(/^https?:\/\/.*/.test(args.path)) {
          return {
            namespace: pluginName,
            path: args.path,
          }
        }
      })

      build.onLoad({ filter:  /^https?:\/\/.*/, namespace: pluginName}, async args => {
        let contents = cache[args.path]
        
        if(!contents) {
          contents = await fetch(args.path)
          cache[args.path] = contents
        }
        return {
          contents,
          resolveDir: '.'
        }
      })
    }
  }
}