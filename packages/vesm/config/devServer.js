import path from 'path'
import {resolveCli} from '../helper/paths.js'

export default function({port}) {
  console.log(222, resolveCli)
  return {
    host:'0.0.0.0',
    servedir: path.join(resolveCli, './template/public'),
    port: port ? Number(port) : 8000
  }
}