import merge from 'lodash/merge.js'

export default async function(processArgs, config) {
  const devServerConfig = (await import('./devServer.js')).default(processArgs)

  return merge({
    devServer: devServerConfig,
  }, config)
}