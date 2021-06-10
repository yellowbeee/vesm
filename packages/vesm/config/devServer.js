const path = require('path')
const {resolveCli} = require('../helper/paths')

module.exports = ({port}) => {
  return {
    host:'0.0.0.0',
    servedir: path.resolve(resolveCli, './template/public'),
    port: port ? Number(port) : 8000
  }
}