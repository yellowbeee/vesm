module.exports = () => {
  return {
    exposes: {
      'App': 'src/App',
      'App2': 'src/App2',
    },
    esbuild: {
    }
  }
}