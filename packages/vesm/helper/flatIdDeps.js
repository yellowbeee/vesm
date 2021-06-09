const path = require('path')
const fs = require('fs')
const {resolveDir} = require('./paths')
const {DEFAULT_EXTENTION} = require('./constant')

function flatIdDeps(deps) {
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

module.exports = {
  flatIdDeps
}