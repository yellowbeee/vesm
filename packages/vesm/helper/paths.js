const path = require('path')
const resolveDir = path.resolve(process.cwd())
const resolveVesmConfig = path.resolve(resolveDir, './vesm.config.js')
const resolvePackageJson = path.resolve(resolveDir, './package.json')
const resolveOutDir = path.resolve(resolveDir, './dist')

module.exports = {
  resolveDir,
  resolveVesmConfig,
  resolvePackageJson,
  resolveOutDir
}