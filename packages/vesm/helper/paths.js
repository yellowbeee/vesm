import path from 'path'

export const resolveCli = new URL('../', import.meta.url).pathname
export const resolveDir = path.resolve(process.cwd())
export const resolveVesmConfig = path.resolve(resolveDir, './vesm.config.js')
export const resolvePackageJson = path.resolve(resolveDir, './package.json')
export const resolveOutDir = path.resolve(resolveDir, './dist')
