import {resolveVesmConfig} from '../helper/paths.js'
const getUserVesmConfig = (await import(resolveVesmConfig)).default

export async function getProjectConfig(env, processArgs) {
  const userVesmConfig = getUserVesmConfig(processArgs)
  const commonConfig = (await import('../config/common.js')).default(processArgs, userVesmConfig)
  const config = (await import(`../config/${env}.js`)).default(processArgs, commonConfig)
  return config
}
