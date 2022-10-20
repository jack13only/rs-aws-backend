const webpack = require('webpack')
const slsw = require('serverless-webpack');

module.exports = (async () => {
  return {
    entry: slsw.lib.entries,
    target: 'node',
    mode: 'none'
  };
})();