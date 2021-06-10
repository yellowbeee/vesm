const esbuild = require('esbuild')
const {getProjectConfig} = require('../helper/project')

module.exports = async (processArgs) => {
  const config = getProjectConfig('development', processArgs)
  esbuild
    .serve(
      config.devServer,
      config.esbuild
    ).then((server) => {
      console.log(`http://localhost:${config.devServer.port}`)
    })
}
