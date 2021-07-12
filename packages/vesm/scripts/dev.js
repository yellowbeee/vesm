import esbuild from 'esbuild'
import {getProjectConfig} from '../helper/project.js'

export default async function (processArgs) {
  const config = await getProjectConfig('development', processArgs)
  esbuild
    .serve(
      config.devServer,
      config.esbuild
    ).then((server) => {
      console.log(`http://localhost:${config.devServer.port}`)
    })
}
