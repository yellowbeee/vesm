import path from 'path'
import fs from 'fs'
import {resolveDir} from './paths.js'
import {DEFAULT_EXTENTION} from './constant.js'

export function flatIdDeps(deps) {
  let idDeps = {}
  for(let i in deps) {
    for(let ext of DEFAULT_EXTENTION) {
      if(!deps[i].endsWith(ext)) {
        let depPath = path.join(resolveDir, deps[i] + ext)
        if(fs.existsSync(depPath)) {
          idDeps[i] = {
            path: depPath,
            modulePath: `./${i}.${ext === 'json' ? ext : 'js'}`
          }
          break
        }
      }
    }
  }
  return idDeps
}