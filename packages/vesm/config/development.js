const merge = require('lodash/merge')

module.exports = (processArgs, config) => {
  const devServerConfig = require('./devServer')(processArgs)

  return merge({
    devServer: devServerConfig,
  }, config)
}