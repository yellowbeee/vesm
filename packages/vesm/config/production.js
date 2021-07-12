
import VesmPluginStream from 'vesm-plugin-stream'
import {resolveOutDir} from '../helper/paths'

export default function production(processArgs, config) {
  config.esbuild.plugins.push(VesmPluginStream())
  config.esbuild.outdir = resolveOutDir
  return config
}