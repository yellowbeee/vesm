const path = require('path')
const resolveCli = path.resolve(__dirname, '../')
const resolveDir = path.resolve(process.cwd())
const resolveVesmConfig = path.resolve(resolveDir, './vesm.config.js')
const resolvePackageJson = path.resolve(resolveDir, './package.json')
const resolveOutDir = path.resolve(resolveDir, './dist')

module.exports = {
  resolveCli,
  resolveDir,
  resolveVesmConfig,
  resolvePackageJson,
  resolveOutDir
}