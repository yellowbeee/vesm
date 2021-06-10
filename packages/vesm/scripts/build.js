const esbuild = require('esbuild')
const {getProjectConfig} = require('../helper/project')

module.exports = async (processArgs) => {
  const config = getProjectConfig('production', processArgs)
  esbuild
    .build(
      config.esbuild
    )
}
