var webpack = require('webpack')
module.exports = {
  entry: './bundle.js'
, output: {
    libraryTarget: 'umd'
  , library: 'address'
  , path: './lib'
  , filename: 'address.js'
  }
, externals: {
    'underscore': {
      root: '_'
    , commonjs2: 'underscore'
    , commonjs: 'underscore'
    , amd: 'underscore'
    }
  , '@websdk/nap': {
      root: 'nap'
    , commonjs2: '@websdk/nap'
    , commonjs: '@websdk/nap'
    , amd: '@websdk/nap'
    }
  , '@websdk/rhumb': {
      root: 'rhumb'
    , commonjs2: '@websdk/rhumb'
    , commonjs: '@websdk/rhumb'
    , amd: '@websdk/rhumb'
    }
  }
, devtool: '#source-map'
}
