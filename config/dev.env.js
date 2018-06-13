// 'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
//   // BASE_API: '"https://api-dev"'
// })
module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://192.168.1.53:8181"'
  // BASE_API: '"http://127.0.0.1:8181"'
  // BASE_API: '"https://easy-mock.com/mock/5b07e3817bebfe1c7e53d313/example"'
}
