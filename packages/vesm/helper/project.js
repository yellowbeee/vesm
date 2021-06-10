const {resolveVesmConfig} = require('../helper/paths')
const getUserVesmConfig = require(resolveVesmConfig)

module.exports = {
  getProjectConfig(env, processArgs) {
    const userVesmConfig = getUserVesmConfig(processArgs)
    const commonConfig = require('../config/common')(processArgs, userVesmConfig)
    const config = require(`../config/${env}`)(processArgs, commonConfig)
    return config
  }
}